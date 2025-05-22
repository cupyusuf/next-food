import { create } from 'zustand';

export interface CartItem {
  food_id: number;
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (food_id: number) => void;
  updateQuantity: (food_id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) => set((state) => {
    const existing = state.items.find((i) => i.food_id === item.food_id);
    if (existing) {
      return {
        items: state.items.map((i) =>
          i.food_id === item.food_id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),
  removeFromCart: (food_id) => set((state) => ({
    items: state.items.filter((i) => i.food_id !== food_id),
  })),
  updateQuantity: (food_id, quantity) => set((state) => ({
    items: state.items.map((i) =>
      i.food_id === food_id ? { ...i, quantity } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
}));
