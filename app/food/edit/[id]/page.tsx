"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFoodStore } from "../../../../stores/foodStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFoodPage: React.FC = () => {
  const { updateFood, getFoodById } = useFoodStore(); // Remove unused Zustand store functions
  const router = useRouter();
  const params = useParams();
  const foodId = parseInt(params.id as string, 10); // Ensure foodId is a number

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const food = await getFoodById(foodId); // Fetch food by ID from API
        setName(food.name);
        setPrice(food.price.toString());
        setDescription(food.description || "");
      } catch (error) {
        console.error("Failed to fetch food details:", error);
        toast.error("Failed to load food details. Please try again.", { autoClose: 2000 });
      }
    };

    fetchFood();
  }, [foodId, getFoodById]); // Add `getFoodById` to the dependency array

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await updateFood(foodId, formData);
      toast.success("Food updated successfully!", { autoClose: 2000 });
      router.push("/food");
    } catch (error) {
      console.error("Failed to update food:", error);
      toast.error("Failed to update food. Please try again.", { autoClose: 2000 });
    }
  };

  return (
    <main className="p-6 bg-gray-900 text-gray-300 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Food</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Food
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditFoodPage;
