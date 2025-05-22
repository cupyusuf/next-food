import { create } from 'zustand';
import { placeOrder as apiPlaceOrder, getOrders as apiGetOrders, payOrder as apiPayOrder } from '../services/api';

interface OrderItem {
  food_id: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  // tambahkan field lain jika perlu
}

interface OrderStore {
  orders: Order[];
  placeOrder: (items: OrderItem[]) => Promise<void>;
  getOrders: () => Promise<void>;
  payOrder: (orderId: number) => Promise<string | null>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  placeOrder: async (items: OrderItem[]) => {
    try {
      await apiPlaceOrder({ items });
      // Optionally refresh orders
    } catch (error) {
      console.error('Error placing order:', error);
    }
  },
  getOrders: async () => {
    try {
      const data = await apiGetOrders();
      set({ orders: data });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  payOrder: async (orderId: number) => {
    try {
      const data = await apiPayOrder(orderId);
      return data.snap_token || null;
    } catch (error) {
      console.error('Error getting snap token:', error);
      return null;
    }
  },
}));
