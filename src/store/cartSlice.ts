import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "@/mocks";

interface CartItem {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
  quantity: number;
  discountCode?: string; // Mã giảm giá nếu có
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: number; quantity?: number }>
    ) => {
      const product = products.find((p) => p.id === action.payload.id);
      if (!product) return;

      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.cart.push({
          id: product.id,
          name: product.name,
          imageSrc: product.src,
          price: product.price,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    applyDiscount: (
      state,
      action: PayloadAction<{ id: number; discountCode: string }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.discountCode = action.payload.discountCode;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyDiscount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
