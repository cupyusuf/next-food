"use client";

import React, { useEffect } from 'react';
import { useFoodStore } from '../../stores/foodStore';
import { Card } from 'flowbite-react';
import Image from 'next/image';

const FoodList: React.FC = () => {
  const { foods, fetchFoods } = useFoodStore();

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Food List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <Card key={food.id} className="max-w-sm">
            {food.image_url && (
              <Image
                src={food.image_url}
                alt={food.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{food.name}</h2>
            <p>{food.description}</p>
            <p className="text-lg font-bold">Price: Rp{food.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodList;