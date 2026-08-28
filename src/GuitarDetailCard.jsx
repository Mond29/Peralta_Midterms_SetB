import React, { useState, useEffect } from 'react';

export default function GuitarDetailCard({ selectedGuitar }) {
  const [activeProfile, setActiveProfile] = useState(null);

  // Selection Sync: Trigger useEffect whenever selectedGuitar changes
  useEffect(() => {
    if (selectedGuitar) {
      setActiveProfile(selectedGuitar);
    }
  }, [selectedGuitar]);

  if (!activeProfile) {
    return (
      <div className="mt-6 p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        <p className="font-medium">No Guitar Selected</p>
        <p className="text-xs text-gray-400 mt-1">Click any row in the table above to view full item profile details.</p>
      </div>
    );
  }

  // Dynamic badge color based on role
  const getBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'manager':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {activeProfile.brand} {activeProfile.model}
          </h3>
          <p className="text-sm text-gray-500">Active Registry Detail Profile</p>
        </div>
        
        {/* User Role Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(activeProfile.userRole)}`}>
          {activeProfile.userRole || 'Staff'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-md text-sm">
        <div>
          <span className="block text-xs font-semibold text-gray-500 uppercase">Body Type</span>
          <span className="font-semibold text-gray-800">{activeProfile.bodyType}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-gray-500 uppercase">Stock Level</span>
          <span className={`font-semibold ${Number(activeProfile.stock) < 5 ? 'text-red-600' : 'text-gray-800'}`}>
            {activeProfile.stock} units
          </span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-gray-500 uppercase">Manufacturer</span>
          <span className="font-semibold text-gray-800">{activeProfile.manufacturer}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-gray-500 uppercase">Registry ID</span>
          <span className="font-semibold text-gray-800">#{activeProfile.id}</span>
        </div>
      </div>
    </div>
  );
}