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

export default function DynamicCharts({ analytics }) {
  // Ensure we have valid data or provide defaults
  const {
    salesOverview = {},
    topProducts = [],
    salesByCategory = [],
    recentSales = []
  } = analytics || {};

  // Sales by Category Chart
  const categoryData = {
    labels: salesByCategory.map(c => c.name || 'Unknown'),
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
    labels: topProducts.map(p => p.name || 'Unknown'),
    datasets: [{
      label: t.unitsSold,
      data: topProducts.map(p => p.totalSales || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }],
  };

  // Recent Sales Trend
  const recentSalesData = {
    labels: recentSales.map(s => new Date(s.date).toLocaleDateString('ar-SA')),
    datasets: [
      {
        label: t.revenue,
        data: recentSales.map(s => s.amount || 0),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sales by Category */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.salesByCategory}</h3>
        {salesByCategory.length > 0 ? (
          <Doughnut
            data={categoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  rtl: true,
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{t.noData}</p>
          </div>
        )}
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.topProducts}</h3>
        {topProducts.length > 0 ? (
          <Bar
            data={topProductsData}
            options={{
              responsive: true,
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: t.unitsSold,
                  },
                },
              },
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{t.noData}</p>
          </div>
        )}
      </div>

      {/* Sales Trend */}
      <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.salesTrends}</h3>
        {recentSales.length > 0 ? (
          <Line
            data={recentSalesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  rtl: true,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: t.revenue,
                  },
                },
              },
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{t.noData}</p>
          </div>
        )}
      </div>
    </div>
  );
} 