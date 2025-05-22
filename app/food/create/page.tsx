"use client";

import React, { useState } from 'react';
import { useFoodStore } from '../../../stores/foodStore';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

const CreateFoodPage: React.FC = () => {
  const { addFood } = useFoodStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }
      formData.append('description', description);

      await addFood(formData);
      Swal.fire({
        icon: 'success',
        title: 'Food created successfully!',
        showConfirmButton: false,
        timer: 2000
      });
      router.push('/food');
    } catch (error) {
      console.error('Failed to create food:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to create food. Please try again.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <main className="p-6 bg-gray-900 text-gray-300 min-h-screen">
      <div className="container mx-auto max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Food</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Create Food
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateFoodPage;
