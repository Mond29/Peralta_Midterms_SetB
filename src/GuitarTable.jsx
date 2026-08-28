import React, { useState } from 'react';
import GuitarDetailCard from './GuitarDetailCard';

export default function GuitarTable({ data, selectedGuitar, onSelectGuitar }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRole, setFilterRole] = useState('ALL'); // State for filtering records
  const pageSize = 5;

  // Filter Control Logic
  const filteredData = data.filter((item) => {
    if (filterRole === 'ALL') return true;
    return item.userRole?.toUpperCase() === filterRole.toUpperCase();
  });

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No guitar items added yet. Fill out the form above to populate the registry.
      </div>
    );
  }

  // Pagination Logic using filtered dataset
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold text-gray-800">Registry Table View</h2>
        
        {/* Toggle / Filter Control */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-600">Filter by Role:</label>
          <select
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1 border rounded-md text-sm bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
      </div>

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
            {currentData.length > 0 ? (
              currentData.map((item) => {
                const isSelected = selectedGuitar?.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectGuitar(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-100 hover:bg-blue-200 font-semibold' : 'hover:bg-gray-50'
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
              })
            ) : (
              <tr>
                <td colSpan="6" className="border p-4 text-center text-gray-400">
                  No records matching the selected role filter.
                </td>
              </tr>
            )}
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

      {/* Active Item Detail Profile Component */}
      <GuitarDetailCard selectedGuitar={selectedGuitar} />
    </div>
  );
}