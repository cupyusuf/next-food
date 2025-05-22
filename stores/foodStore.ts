import { create } from 'zustand';
import { getFoods } from '../services/api';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string; // Optional image property
}

interface FoodStore {
  foods: Food[];
  fetchFoods: () => Promise<void>;
}

export const useFoodStore = create<FoodStore>((set: (partial: Partial<FoodStore>) => void) => ({
  foods: [],
  fetchFoods: async () => {
    try {
      const data = await getFoods();
      set({ foods: data });
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  },
}));
