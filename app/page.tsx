"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useFoodStore } from '../stores/foodStore';
import { useCartStore } from '../stores/cartStore';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    snap: unknown;
  }
}

const HomePage: React.FC = () => {
  const { foods, fetchFoods } = useFoodStore();
  const { addToCart } = useCartStore();
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleAddToCart = (food: { id: number; name: string; price: number; image_url?: string }) => {
    addToCart({
      food_id: food.id,
      name: food.name,
      price: food.price,
      image_url: food.image_url,
    });
    Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1200
    });
  };

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food.id} className="border border-gray-700 bg-gray-800 shadow-md p-4 max-w-xs rounded-lg">
            <Image
              src={food.image_url || '/vercel.svg'}
              alt={food.name}
              width={200}
              height={150}
              className="rounded-md mb-4 bg-gray-700"
            />
            <h2 className="text-lg font-semibold mb-2 text-white">{food.name}</h2>
            <p className="text-gray-400 mb-2 truncate">{food.description}</p>
            <p className="text-md font-bold mb-4 text-blue-400">Rp {food.price}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition-colors duration-150"
              onClick={() => handleAddToCart(food)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
