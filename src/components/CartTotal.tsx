import { ICartItem } from "@/models";
import { Box, Typography } from "@mui/material";

interface CartTotalProps {
  cartItems: ICartItem[];
}

const CartTotal = ({ cartItems }: CartTotalProps) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
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
