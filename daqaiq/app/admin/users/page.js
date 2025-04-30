'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const router = useRouter();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: itemsPerPage,
        search: searchTerm,
        ...(roleFilter !== 'all' && { role: roleFilter }),
        ...(statusFilter !== 'all' && { status: statusFilter })
      });

      const response = await fetch(`/api/admin/users?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = async (action) => {
    if (!selectedUsers.length) return;

    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIds: selectedUsers,
          action
        })
      });

      if (!response.ok) throw new Error('Failed to perform bulk action');
      
      await fetchUsers();
      setSelectedUsers([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user._id));
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>حدث خطأ: {error}</p>
        <button 
          onClick={fetchUsers}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <button
          onClick={() => router.push('/admin/users/new')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          إضافة مستخدم جديد
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="بحث..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">جميع الأدوار</option>
          <option value="admin">مدير</option>
          <option value="supplier">مورد</option>
          <option value="customer">عميل</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={() => handleBulkAction('activate')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            تفعيل
          </button>
          <button
            onClick={() => handleBulkAction('deactivate')}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            تعطيل
          </button>
          <button
            onClick={() => handleBulkAction('delete')}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-2 border">الاسم</th>
              <th className="p-2 border">البريد الإلكتروني</th>
              <th className="p-2 border">الدور</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">تاريخ التسجيل</th>
              <th className="p-2 border">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-4">جاري التحميل...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">لا يوجد مستخدمين</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleSelectUser(user._id)}
                    />
                  </td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">
                    {user.role === 'admin' && 'مدير'}
                    {user.role === 'supplier' && 'مورد'}
                    {user.role === 'customer' && 'عميل'}
                  </td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="p-2 border">
                    {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/users/${user._id}`)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete', [user._id])}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          السابق
        </button>
        <span className="px-3 py-1">
          صفحة {page} من {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
} 