import { CartActions, CartItemList, CartTotal } from "@/components";
import { IVoucher } from "@/models";
import {
  applyDiscount,
  removeFromCart,
  RootState,
  updateQuantity,
} from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

interface ICartSummaryProps {
  onCheckout: () => void;
}

const CartSummary = ({ onCheckout }: ICartSummaryProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleOnUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleOnSelectVoucher = (itemId: number, voucher: IVoucher | null) => {
    dispatch(applyDiscount({ id: itemId, voucher }));
  };

  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Typography variant="h6">Giỏ hàng & Thanh toán</Typography>

      {/* Danh sách sản phẩm cuộn được */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          pb: 2,
        }}
      >
        <CartItemList
          cartItems={cartItems}
          onRemove={handleRemove}
          onUpdateQuantity={handleOnUpdateQuantity}
          onSelectVoucher={handleOnSelectVoucher}
        />
      </Box>

      {/* Tổng tiền */}
      <CartTotal cartItems={cartItems} />

      {/* Nút thanh toán cố định */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          py: 2,
          boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <CartActions cartItems={cartItems} onCheckout={onCheckout} />
      </Box>
    </Paper>
  );
};

export default CartSummary;
