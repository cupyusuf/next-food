import { create } from 'zustand';
import { placeOrder as apiPlaceOrder } from '../services/api';

interface OrderItem {
  food_id: number;
  quantity: number;
}

interface OrderStore {
  placeOrder: (items: OrderItem[]) => Promise<void>;
}

export const useOrderStore = create<OrderStore>(() => ({
  placeOrder: async (items: OrderItem[]) => {
    try {
      await apiPlaceOrder({ items });
      console.log('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  },
}));
