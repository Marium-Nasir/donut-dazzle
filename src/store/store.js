// src/store.js
import create from "zustand";

const useStore = create((set) => ({
  cartItems: [],
  addItem: (item) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useStore;
