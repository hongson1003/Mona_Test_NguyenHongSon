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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 3,
        p: 2,
        bgcolor: "primary.lighter",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Tổng tiền:
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="error"
        sx={{
          backgroundColor: "white",
          px: 2,
          py: 1,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {formatCurrency(totalAmount)}
      </Typography>
    </Box>
  );
};

export default CartTotal;
