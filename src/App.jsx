import React, { useState } from 'react';
import GuitarForm from './GuitarForm';
import GuitarTable from './GuitarTable';

export default function App() {
  const [guitars, setGuitars] = useState([]);
  const [selectedGuitar, setSelectedGuitar] = useState(null);

  const handleAddGuitar = (newGuitar) => {
    setGuitars((prev) => [...prev, newGuitar]);
    setSelectedGuitar(newGuitar);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Guitar Store & Inventory Manager
        </h1>
        <GuitarForm onAddGuitar={handleAddGuitar} />
        <GuitarTable
          data={guitars}
          selectedGuitar={selectedGuitar}
          onSelectGuitar={setSelectedGuitar}
        />
      </div>
    </div>
  );
}