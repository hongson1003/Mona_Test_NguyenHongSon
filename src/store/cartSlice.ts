import { products } from "@/mocks";
import { IVoucher } from "@/models";
import { ICartProduct, ICartState } from "@/models/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (
      state,
      action: PayloadAction<{ id: number; quantity?: number }[]>
    ) => {
      // Lọc ra danh sách các ID từ payload
      const newCartIds = action.payload.map((item) => item.id);

      // Xóa những sản phẩm không có trong danh sách mới
      state.items = state.items.filter((item) =>
        newCartIds.includes(item.product.id)
      );

      // Duyệt qua danh sách mới để cập nhật giỏ hàng
      action.payload.forEach(({ id, quantity }) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;

        const existingItem = state.items.find(
          (item) => item.product.id === product.id
        );
        if (existingItem) {
          existingItem.quantity = quantity || existingItem.quantity;
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
            quantity: quantity || 1,
            voucher: null,
          });
        }
      });
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
      action: PayloadAction<{ id: number; voucher: IVoucher | null }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.voucher = action.payload.voucher;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCarts,
  removeFromCart,
  updateQuantity,
  applyDiscount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
