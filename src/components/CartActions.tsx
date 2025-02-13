import { Button, Box } from "@mui/material";

interface CartActionsProps {
  cartItems: any[];
}

const CartActions: React.FC<CartActionsProps> = ({ cartItems }) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={cartItems.length === 0}
      >
        Thanh toán
      </Button>
    </Box>
  );
};

export default CartActions;
