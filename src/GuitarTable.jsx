import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function GuitarTable({ data, selectedGuitar, onSelectGuitar }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // Set to 5 rows per page
  });

  const columns = [
    {
      header: 'Guitar Model',
      accessorKey: 'model',
    },
    {
      header: 'Body Type',
      accessorKey: 'bodyType',
    },
    {
      header: 'Brand',
      accessorKey: 'brand',
    },
    {
      header: 'Stock',
      accessorKey: 'stock',
    },
    {
      header: 'Manufacturer',
      accessorKey: 'manufacturer',
    },
    {
      header: 'Role',
      accessorKey: 'userRole',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No guitar items added yet. Fill out the form above to populate the registry.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Registry Table View</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border p-3 font-semibold text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isSelected = selectedGuitar?.id === row.original.id;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectGuitar(row.original)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border p-3 text-gray-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Page <span className="font-semibold">{table.getState().pagination.pageIndex + 1}</span> of{' '}
          <span className="font-semibold">{table.getPageCount() || 1}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 font-medium"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 font-medium"
          >
            Next
          </button>
        </div>
      </div>

      {/* Active Selected Entry Display */}
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