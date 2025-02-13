import { CartActions, CartItemList, CartTotal } from "@/components";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sản phẩm A", price: 50000, quantity: 1, discount: 0 },
    { id: 2, name: "Sản phẩm B", price: 70000, quantity: 2, discount: 0 },
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // const totalAmount = cartItems.reduce(
  //   (sum, item) => sum + (item.price - item.discount) * item.quantity,
  //   0
  // );

  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Giỏ hàng & Thanh toán</Typography>

      <CartItemList cartItems={cartItems} onRemove={handleRemove} />

      <CartTotal cartItems={cartItems} />

      <CartActions cartItems={cartItems} />
    </Paper>
  );
};

export default CartSummary;
