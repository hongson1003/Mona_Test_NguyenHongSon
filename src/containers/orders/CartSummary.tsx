import { CartActions, CartItemList, CartTotal } from "@/components";
import { RootState } from "@/store";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

interface ICartSummaryProps {
  onCheckout: () => void;
}

const CartSummary = ({ onCheckout }: ICartSummaryProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Giỏ hàng & Thanh toán</Typography>

      <CartItemList cartItems={cartItems} onRemove={handleRemove} />

      <CartTotal cartItems={cartItems} />

      {/* Truyền onCheckout vào CartActions */}
      <CartActions cartItems={cartItems} onCheckout={onCheckout} />
    </Paper>
  );
};

export default CartSummary;
