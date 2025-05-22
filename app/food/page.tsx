"use client";

import React from 'react';
import useFoodStore from '../../stores/foodStore';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import Image from 'next/image';

const FoodPage: React.FC = () => {
  const { foods, fetchFoods } = useFoodStore();
  const router = useRouter();

  // Fetch foods when the component is rendered
  fetchFoods();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    return foods.filter((food) => food.name.toLowerCase().includes(searchValue));
  };

  return (
    <main className="p-6 bg-gray-900 text-gray-300 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Food Management</h1>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => router.push('/food/create')}
          >
            Add Food
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">#</th>
              <th className="border border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-700 px-4 py-2">Price</th>
              <th className="border border-gray-700 px-4 py-2">Image</th>
              <th className="border border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={food.id || index} className="hover:bg-gray-800">
                <td className="border border-gray-700 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-700 px-4 py-2">{food.name}</td>
                <td className="border border-gray-700 px-4 py-2">${food.price}</td>
                <td className="border border-gray-700 px-4 py-2 text-center">
                  {food.image_url && (
                    <Image
                      src={food.image_url}
                      alt={food.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  )}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-center">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                    onClick={() => router.push(`/food/edit/${food.id}`)}
                  >
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default FoodPage;
