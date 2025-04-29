'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Papa from 'papaparse';
import ExcelJS from 'exceljs';

export default function CsvUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;

    if (fileType === 'text/csv' || fileType === 'application/csv') {
      // Handle CSV file
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          validateAndSetPreview(results.data);
        },
        error: (error) => {
          toast.error('Error reading CSV file');
          console.error('CSV reading error:', error);
        }
      });
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Handle XLSX file
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);
        const worksheet = workbook.worksheets[0];
        const jsonData = [];

        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // Skip header row
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const header = worksheet.getRow(1).getCell(colNumber).value; // Get header from the first row
            rowData[header] = cell.value;
          });
          jsonData.push(rowData);
        });

        validateAndSetPreview(jsonData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error('Please upload a CSV or XLSX file');
    }
  };

  const validateAndSetPreview = (data) => {
    // Check if this is a new product upload or inventory update
    const isNewProduct = data[0].hasOwnProperty('name');
    
    // Validate the structure of the data
    const requiredColumns = isNewProduct 
      ? ['name', 'description', 'price', 'category', 'stock'] 
      : ['name', 'quantity', 'type'];
    
    const missingColumns = requiredColumns.filter(col => !data[0].hasOwnProperty(col));

    if (missingColumns.length > 0) {
      toast.error(`Missing required columns: ${missingColumns.join(', ')}`);
      return;
    }

    // Add metadata about the type of upload
    setPreview({
      type: isNewProduct ? 'new_products' : 'inventory_update',
      data
    });
  };

  const handleUpload = async () => {
    if (!preview) return;

    setUploading(true);
    try {
      const endpoint = preview.type === 'new_products' 
        ? '/api/supplier/products/bulk'
        : '/api/supplier/inventory';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: preview.data
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process upload');
      }

      toast.success('File processed successfully');
      if (onUploadComplete) {
        onUploadComplete(data.results);
      }
      setPreview(null);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">رفع جماعي عبر CSV/XLSX</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رفع ملف CSV أو XLSX
          </label>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <div className="mt-1 text-sm text-gray-500">
            <p>للمنتجات الجديدة، يجب تضمين: الاسم، الوصف، السعر، الفئة، المخزون</p>
            <p>لتحديث المخزون، يجب تضمين: الاسم، الكمية، النوع</p>
          </div>
        </div>

        {preview && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">
              معاينة ({preview.data.length} عنصر) - {preview.type === 'new_products' ? 'منتجات جديدة' : 'تحديث المخزون'}
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      {Object.keys(preview.data[0]).map((header) => (
                        <th
                          key={header}
                          className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.data.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <td
                            key={i}
                            className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? 'جاري المعالجة...' : 'معالجة الملف'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 