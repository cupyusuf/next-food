"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useFoodStore } from '../stores/foodStore';

const HomePage: React.FC = () => {
  const { foods, fetchFoods } = useFoodStore();

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food.id} className="border rounded-lg shadow-md p-4 max-w-xs">
            <Image
              src={food.image_url || '/vercel.svg'}
              alt={food.name}
              width={200}
              height={150}
              className="rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{food.name}</h2>
            <p className="text-gray-600 mb-2 truncate">{food.description}</p>
            <p className="text-md font-bold mb-4">Rp {food.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
