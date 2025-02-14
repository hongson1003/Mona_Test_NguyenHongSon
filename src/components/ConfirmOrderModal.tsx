import { ICartItem, ICustomerInfo } from "@/models";
import { calculateTotalPrice, formatCurrency } from "@/utils";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

interface IConfirmOrderProps {
  open: boolean;
  onClose: () => void;
  customerInfo: ICustomerInfo;
  paymentMethod: string;
  amountReceived?: number;
  cartItems: ICartItem[];
}

const ConfirmOrder = ({
  open,
  onClose,
  customerInfo,
  paymentMethod,
  amountReceived,
  cartItems,
}: IConfirmOrderProps) => {
  // Tính tổng tiền giỏ hàng
  const totalAmount = useMemo(
    () => calculateTotalPrice(cartItems),
    [cartItems]
  );

  // Tính tiền thừa (nếu có)
  const changeAmount = useMemo(
    () => (amountReceived ?? 0) - totalAmount,
    [amountReceived, totalAmount]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Xác nhận đơn hàng</DialogTitle>
      <DialogContent>
        {/* Thông tin khách hàng */}
        <Box mb={2}>
          <Typography variant="h6">Thông tin khách hàng</Typography>
          <Typography variant="body1">Họ tên: {customerInfo.name}</Typography>
          <Typography variant="body1">Email: {customerInfo.email}</Typography>
          <Typography variant="body1">SĐT: {customerInfo.phone}</Typography>
        </Box>

        <Divider />

        {/* Thông tin giỏ hàng */}
        <Box mt={2} mb={2}>
          <Typography variant="h6">Sản phẩm trong giỏ hàng</Typography>
          {cartItems.map((item: ICartItem) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              my={1}
            >
              <Typography variant="body1">
                {item.product.name} (x{item.quantity})
              </Typography>
              <Typography variant="body1">
                {formatCurrency(item.product.price * item.quantity)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider />

        {/* Thông tin thanh toán */}
        <Box mt={2}>
          <Typography variant="h6">Thanh toán</Typography>
          <Typography variant="body1">
            Phương thức: {paymentMethod === "cash" ? "Tiền mặt" : "Thẻ"}
          </Typography>
          <Typography variant="body1">
            Tổng tiền: {formatCurrency(totalAmount)}
          </Typography>

          {paymentMethod === "cash" && amountReceived !== undefined && (
            <>
              <Typography variant="body1">
                Số tiền khách đưa: {formatCurrency(amountReceived)}
              </Typography>
              {amountReceived >= totalAmount && (
                <Typography variant="body1" color="primary">
                  Tiền thừa trả khách: {formatCurrency(changeAmount)}
                </Typography>
              )}
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button variant="contained" color="primary">
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOrder;
