import { products } from "@/mocks";
import { ICartProduct, ICartState } from "@/models/cart";
import { IDiscount } from "@/models/discount";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICartState = {
  items: [],
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

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        const cartProduct: ICartProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          imageSrc: product.imageSrc,
        };

        state.items.push({
          id: Date.now(), // ID riêng cho item trong cart, tránh trùng với product.id
          product: cartProduct,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    applyDiscount: (
      state,
      action: PayloadAction<{ id: number; discount: IDiscount }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.discount = action.payload.discount;
      }
    },
    clearCart: (state) => {
      state.items = [];
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
