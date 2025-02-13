import { Box, Paper, Typography, Button } from "@mui/material";
import { useState } from "react";
import CartItem from "./CartItem";

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sản phẩm A", price: 50000, quantity: 1, discount: 0 },
    { id: 2, name: "Sản phẩm B", price: 70000, quantity: 2, discount: 0 },
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.price - item.discount) * item.quantity,
    0
  );

  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Giỏ hàng & Thanh toán</Typography>

      {cartItems.length === 0 ? (
        <Typography>Giỏ hàng trống</Typography>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={handleRemove} />
        ))
      )}

      {/* Tổng tiền */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography variant="subtitle1">Tổng tiền:</Typography>
        <Typography variant="h6" color="primary">
          {totalAmount.toLocaleString()} VND
        </Typography>
      </Box>

      <Button variant="contained" color="primary" fullWidth>
        Thanh toán
      </Button>
    </Paper>
  );
};

export default CartSummary;
