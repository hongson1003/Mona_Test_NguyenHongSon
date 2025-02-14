import { ICartItem } from "@/models";
import { calculateTotalPrice, formatCurrency } from "@/utils";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

interface ICartTotalProps {
  cartItems: ICartItem[];
}

const CartTotal = ({ cartItems }: ICartTotalProps) => {
  const totalAmount = useMemo(
    () => calculateTotalPrice(cartItems),
    [cartItems]
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Typography variant="subtitle1">Tổng tiền:</Typography>
      <Typography variant="h6" color="primary">
        {formatCurrency(totalAmount)}
      </Typography>
    </Box>
  );
};

export default CartTotal;
