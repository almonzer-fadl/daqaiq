'use client';

export default function UserActions({ selectedCount, onBulkAction }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onBulkAction('activate')}
            className="px-4 py-2 text-sm text-green-700 bg-green-100 hover:bg-green-200 rounded-md"
          >
            Activate
          </button>
          <button
            onClick={() => onBulkAction('deactivate')}
            className="px-4 py-2 text-sm text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded-md"
          >
            Deactivate
          </button>
          <button
            onClick={() => onBulkAction('delete')}
            className="px-4 py-2 text-sm text-red-700 bg-red-100 hover:bg-red-200 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 