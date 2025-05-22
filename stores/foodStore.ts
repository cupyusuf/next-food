import { create } from 'zustand';
import { getFoods, createFood, updateFood, deleteFood, getFoodById } from '../services/api';

interface Food {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string; // Add image_url property
}

interface FoodState {
  foods: Food[];
  fetchFoods: () => Promise<void>;
  addFood: (food: FormData) => Promise<void>;
  updateFood: (id: number, food: FormData) => Promise<void>;
  deleteFood: (id: number) => Promise<void>;
  getFoodById: (id: number) => Promise<Food>;
}

const useFoodStore = create<FoodState>((set) => ({
  foods: [],

  fetchFoods: async () => {
    try {
      const data = await getFoods();
      set({ foods: data });
    } catch (error) {
      console.error('Failed to fetch foods:', error);
      alert('Failed to load foods. Please try again later.');
    }
  },

  addFood: async (food: FormData) => {
    try {
      const newFood = await createFood(food); // Pass FormData to API
      set((state) => ({ foods: [...state.foods, newFood] }));
      console.log('Food added successfully:', newFood); // Log item yang ditambahkan
    } catch (error) {
      console.error('Failed to add food:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to add food: ${errorMessage}`);
    }
  },

  updateFood: async (id: number, food: FormData) => {
    try {
      const updatedFood = await updateFood(id, food); // Call API to update food
      set((state) => {
        const foodIndex = state.foods.findIndex((f) => f.id === id);
        if (foodIndex === -1) {
          console.error(`Food with id ${id} not found in state`); // Log jika id tidak ditemukan
          throw new Error(`Food with id ${id} not found`);
        }
        const updatedFoods = [...state.foods];
        updatedFoods[foodIndex] = updatedFood;
        console.log('Food updated successfully:', updatedFood); // Log item yang diperbarui
        return { foods: updatedFoods };
      });
    } catch (error) {
      console.error("Failed to update food:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to update food: ${errorMessage}`);
      throw error; // Ensure the error is propagated
    }
  },

  deleteFood: async (id: number) => {
    try {
      console.log('State before delete:', useFoodStore.getState().foods); // Log state sebelum penghapusan
      await deleteFood(id);
      set((state) => {
        const updatedFoods = state.foods.filter((f) => f.id !== id);
        console.log('Food deleted successfully. State after delete:', updatedFoods); // Log state setelah penghapusan
        return { foods: updatedFoods };
      });
    } catch (error) {
      console.error('Failed to delete food:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to delete food: ${errorMessage}`);
      throw error; // Ensure the error is propagated
    }
  },

  getFoodById: async (id: number) => {
    try {
      const food = await getFoodById(id); // Call API to fetch food by ID
      return food;
    } catch (error) {
      console.error("Failed to fetch food by ID:", error);
      throw error;
    }
  },
}));

export default useFoodStore;
export { useFoodStore };
