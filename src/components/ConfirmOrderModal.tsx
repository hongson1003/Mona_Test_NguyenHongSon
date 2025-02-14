import { ICartItem, ICustomerInfo } from "@/models";
import { calculateTotalPrice, formatCurrency } from "@/utils";
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  onOk: () => void;
}

const ConfirmOrder = ({
  open,
  onClose,
  customerInfo,
  paymentMethod,
  amountReceived,
  cartItems,
  onOk,
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center" sx={{ fontWeight: "bold" }}>
        Xác nhận đơn hàng
      </DialogTitle>
      <DialogContent>
        {/* Thông tin khách hàng */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Thông tin khách hàng
            </Typography>
            <Typography variant="body1">👤 {customerInfo.name}</Typography>
            <Typography variant="body1">📧 {customerInfo.email}</Typography>
            <Typography variant="body1">📞 {customerInfo.phone}</Typography>
          </CardContent>
        </Card>

        {/* Thông tin giỏ hàng */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🛒 Sản phẩm trong giỏ hàng
            </Typography>
            {cartItems.map((item: ICartItem) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ py: 1 }}
              >
                <Typography variant="body1">
                  {item.product.name} (x{item.quantity})
                </Typography>
                <Typography variant="body1">
                  {formatCurrency(item.product.price * item.quantity)}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Thông tin thanh toán */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💳 Thông tin thanh toán
            </Typography>
            <Typography variant="body1">
              Phương thức:{" "}
              <strong>
                {paymentMethod === "cash" ? "💵 Tiền mặt" : "💳 Thẻ"}
              </strong>
            </Typography>
            <Typography variant="body1">
              Tổng tiền:{" "}
              <strong style={{ color: "#d32f2f" }}>
                {formatCurrency(totalAmount)}
              </strong>
            </Typography>

            {paymentMethod === "cash" && amountReceived !== undefined && (
              <>
                <Typography variant="body1">
                  Số tiền khách đưa: {formatCurrency(amountReceived)}
                </Typography>
                {amountReceived >= totalAmount && (
                  <Typography
                    variant="body1"
                    sx={{ color: "#388e3c", fontWeight: "bold" }}
                  >
                    Tiền thừa: {formatCurrency(changeAmount)}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </DialogContent>

      {/* Hành động */}
      <DialogActions sx={{ p: 2, justifyContent: "center" }}>
        <Button
          onClick={onClose}
          color="error"
          variant="contained"
          startIcon={<Cancel />}
          sx={{ minWidth: 140 }}
        >
          Hủy
        </Button>
        <Button
          onClick={onOk}
          variant="contained"
          color="primary"
          startIcon={<CheckCircle />}
          sx={{ minWidth: 180 }}
        >
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOrder;
