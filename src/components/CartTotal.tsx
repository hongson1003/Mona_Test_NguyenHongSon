import { Box, Typography } from "@mui/material";

interface CartTotalProps {
  cartItems: { price: number; quantity: number; discount: number }[];
}

const CartTotal: React.FC<CartTotalProps> = ({ cartItems }) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.price - item.discount) * item.quantity,
    0
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Typography variant="subtitle1">Tổng tiền:</Typography>
      <Typography variant="h6" color="primary">
        {totalAmount.toLocaleString()} VND
      </Typography>
    </Box>
  );
};

export default CartTotal;
