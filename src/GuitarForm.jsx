import React, { useState } from 'react';

export default function GuitarForm({ onAddGuitar }) {
  const [formData, setFormData] = useState({
    model: '',
    bodyType: 'Electric',
    brand: '',
    stock: '',
    manufacturer: '',
    userRole: 'Merchant',
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let err = '';
    if (name === 'model') {
      if (!value.trim()) err = 'Guitar Model is required.';
      else if (value.trim().length < 3) err = 'Model name must be at least 3 characters.';
    }
    if (name === 'brand' && !value.trim()) {
      err = 'Brand name is required.';
    }
    if (name === 'manufacturer' && !value.trim()) {
      err = 'Manufacturer name is required.';
    }
    if (name === 'stock') {
      const num = Number(value);
      if (!value) err = 'Stock quantity is required.';
      else if (isNaN(num) || num < 1 || num > 100) err = 'Stock must be between 1 and 100.';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      model: validate('model', formData.model),
      brand: validate('brand', formData.brand),
      manufacturer: validate('manufacturer', formData.manufacturer),
      stock: validate('stock', formData.stock),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== '');
    if (!hasError) {
      onAddGuitar({
        id: Date.now(),
        ...formData,
        stock: Number(formData.stock),
      });
      setFormData({
        model: '',
        bodyType: 'Electric',
        brand: '',
        stock: '',
        manufacturer: '',
        userRole: 'Merchant',
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Register Guitar Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Guitar Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Stratocaster"
          />
          {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Body Type</label>
          <select
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="Electric">Electric</option>
            <option value="Acoustic">Acoustic</option>
            <option value="Bass">Bass</option>
            <option value="Classical">Classical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="e.g. Fender"
          />
          {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Quantity (1–100)</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="1-100"
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Manufacturer Name</label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="e.g. FMIC"
          />
          {errors.manufacturer && <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
          <div className="flex gap-4">
            <label className="flex items-center text-sm">
              <input
                type="radio"
                name="userRole"
                value="Merchant"
                checked={formData.userRole === 'Merchant'}
                onChange={handleChange}
                className="mr-2"
              />
              Merchant
            </label>
            <label className="flex items-center text-sm">
              <input
                type="radio"
                name="userRole"
                value="Consumer"
                checked={formData.userRole === 'Consumer'}
                onChange={handleChange}
                className="mr-2"
              />
              Consumer
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Add Guitar to Inventory
        </button>
      </form>
    </div>
  );
}