import { create } from 'zustand';

interface UserState {
  name: string;
  phone: string | null;
  address: string | null;
  setUser: (user: { name: string; phone: string | null; address: string | null }) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: '',
  phone: null,
  address: null,
  setUser: (user) => set(user),
}));

export default useUserStore;