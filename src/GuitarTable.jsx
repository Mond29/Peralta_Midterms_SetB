import React, { useState } from 'react';

export default function GuitarTable({ data, selectedGuitar, onSelectGuitar }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No guitar items added yet. Fill out the form above to populate the registry.
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Registry Table View</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 font-semibold text-gray-700">Guitar Model</th>
              <th className="border p-3 font-semibold text-gray-700">Body Type</th>
              <th className="border p-3 font-semibold text-gray-700">Brand</th>
              <th className="border p-3 font-semibold text-gray-700">Stock</th>
              <th className="border p-3 font-semibold text-gray-700">Manufacturer</th>
              <th className="border p-3 font-semibold text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => {
              const isSelected = selectedGuitar?.id === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectGuitar(item)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="border p-3 text-gray-600">{item.model}</td>
                  <td className="border p-3 text-gray-600">{item.bodyType}</td>
                  <td className="border p-3 text-gray-600">{item.brand}</td>
                  <td className="border p-3 text-gray-600">{item.stock}</td>
                  <td className="border p-3 text-gray-600">{item.manufacturer}</td>
                  <td className="border p-3 text-gray-600">{item.userRole}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Page <span className="font-semibold">{currentPage}</span> of{' '}
          <span className="font-semibold">{totalPages}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 font-medium"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 font-medium"
          >
            Next
          </button>
        </div>
      </div>

      {/* Selected Item View */}
      {selectedGuitar && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-bold text-blue-800">Active Selected Item:</h3>
          <p className="text-sm text-blue-700 mt-1">
            <strong>{selectedGuitar.brand} {selectedGuitar.model}</strong> ({selectedGuitar.bodyType}) — Stock: {selectedGuitar.stock} | Mfr: {selectedGuitar.manufacturer} ({selectedGuitar.userRole})
          </p>
        </div>
      )}
    </div>
  );
}