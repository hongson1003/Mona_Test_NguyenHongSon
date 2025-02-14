import { ICartItem } from "@/models";
import { Box, Button } from "@mui/material";

interface ICartActionsProps {
  onCheckout: () => void;
  cartItems: ICartItem[];
}

const CartActions = ({ onCheckout, cartItems }: ICartActionsProps) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={cartItems.length === 0}
        onClick={onCheckout}
      >
        Thanh toán
      </Button>
    </Box>
  );
};

export default CartActions;
