import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define CartItem interface
interface CartItem {
  id: string; // Changed from number to string to match ProductCard usage
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Define the Zustand store interface
interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void; // Changed to match ProductCard usage
  updateQuantity: (id: string, quantity: number) => void; // Changed id type to string
  removeItem: (id: string) => void; // Changed id type to string
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (newItem: Omit<CartItem, 'quantity'>) => {
        const existingItem = get().cart.find((item) => item.id === newItem.id);
        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 } // Always add 1 to match ProductCard
                : item
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...newItem, quantity: 1 }], // Add quantity: 1
          }));
        }
      },
      updateQuantity: (id: string, quantity: number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
          ),
        })),
      removeItem: (id: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" } // persist to localStorage
  )
);

export default useCartStore;