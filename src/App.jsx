import React, { useState } from 'react';
import GuitarForm from './GuitarForm';

export default function App() {
  const [guitars, setGuitars] = useState([]);

  const handleAddGuitar = (newGuitar) => {
    setGuitars((prev) => [...prev, newGuitar]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Guitar Store & Inventory Manager
        </h1>
        <GuitarForm onAddGuitar={handleAddGuitar} />
      </div>
    </div>
  );
}