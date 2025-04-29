'use client';

import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: '📦',
      href: '/admin/products/add',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Categories',
      description: 'Add or edit product categories',
      icon: '🏷️',
      href: '/admin/categories',
      color: 'bg-green-500'
    },
    {
      title: 'View Orders',
      description: 'Check and manage customer orders',
      icon: '🛍️',
      href: '/admin/orders',
      color: 'bg-purple-500'
    },
    {
      title: 'Manage Suppliers',
      description: 'Add or edit supplier accounts',
      icon: '🏢',
      href: '/admin/suppliers',
      color: 'bg-yellow-500'
    },
    {
      title: 'User Management',
      description: 'Manage customer accounts',
      icon: '👥',
      href: '/admin/users',
      color: 'bg-indigo-500'
    },
    {
      title: 'Generate Reports',
      description: 'Create sales and inventory reports',
      icon: '📊',
      href: '/admin/reports',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${action.color} bg-opacity-10 mr-4`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 