'use client';

export default function DashboardMetrics({ metrics }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  const metricCards = [
    {
      title: 'Total Users',
      value: metrics.totalUsers,
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Products',
      value: metrics.totalProducts,
      icon: '📦',
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: metrics.totalOrders,
      icon: '🛍️',
      color: 'bg-purple-500'
    },
    {
      title: 'Total Suppliers',
      value: metrics.totalSuppliers,
      icon: '🏢',
      color: 'bg-yellow-500'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      icon: '💰',
      color: 'bg-indigo-500'
    },
    {
      title: 'Pending Orders',
      value: metrics.pendingOrders,
      icon: '⏳',
      color: 'bg-red-500'
    },
    {
      title: 'Low Stock Items',
      value: metrics.lowStockItems,
      icon: '⚠️',
      color: 'bg-orange-500'
    },
    {
      title: 'Active Suppliers',
      value: metrics.activeSuppliers,
      icon: '✅',
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
              <span className="text-2xl">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 