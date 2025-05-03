'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { SUPPLIER_TRANSLATIONS as t } from '../constants/translations';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Configure ChartJS defaults for RTL and Arabic
ChartJS.defaults.font.family = 'Arial, sans-serif';
ChartJS.defaults.rtl = true;

export default function DynamicCharts({ analytics }) {
  // Ensure we have valid data or provide defaults
  const {
    salesOverview = {},
    topProducts = [],
    salesByCategory = [],
    recentSales = []
  } = analytics || {};

  // Format currency for tooltips
  const formatCurrency = (value) => {
    return `ر.س${value.toLocaleString('ar-SA')}`;
  };

  // Sales by Category Chart
  const categoryData = {
    labels: salesByCategory.map(c => c.name || 'غير معروف'),
    datasets: [{
      data: salesByCategory.map(c => c.revenue || 0),
      backgroundColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
      ],
    }],
  };

  // Top Products Chart
  const topProductsData = {
    labels: topProducts.map(p => p.name || 'غير معروف'),
    datasets: [{
      label: t.unitsSold || 'الوحدات المباعة',
      data: topProducts.map(p => p.totalSales || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }],
  };

  // Recent Sales Trend
  const recentSalesData = {
    labels: recentSales.map(s => new Date(s.date).toLocaleDateString('ar-SA')),
    datasets: [
      {
        label: t.revenue || 'الإيرادات',
        data: recentSales.map(s => s.amount || 0),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        rtl: true,
        labels: {
          usePointStyle: true,
          font: {
            family: 'Arial, sans-serif'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sales by Category */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.salesByCategory || 'المبيعات حسب الفئة'}</h3>
        <div className="h-64">
          {salesByCategory.length > 0 ? (
            <Doughnut
              data={categoryData}
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${formatCurrency(value)}`;
                      }
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">{t.noData || 'لا توجد بيانات'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.topProducts || 'المنتجات الأكثر مبيعاً'}</h3>
        <div className="h-64">
          {topProducts.length > 0 ? (
            <Bar
              data={topProductsData}
              options={{
                ...commonOptions,
                indexAxis: 'y',
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: t.unitsSold || 'الوحدات المباعة'
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">{t.noData || 'لا توجد بيانات'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Sales Trend */}
      <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.salesTrends || 'اتجاهات المبيعات'}</h3>
        <div className="h-64">
          {recentSales.length > 0 ? (
            <Line
              data={recentSalesData}
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    position: 'top'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: t.revenue || 'الإيرادات'
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">{t.noData || 'لا توجد بيانات'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 