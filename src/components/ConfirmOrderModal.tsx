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
  Stack,
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
  amountReceived = 0,
  cartItems,
  onOk,
}: IConfirmOrderProps) => {
  const { totalAmount, changeAmount } = useMemo(() => {
    const total = calculateTotalPrice(cartItems);
    return { totalAmount: total, changeAmount: amountReceived - total };
  }, [cartItems, amountReceived]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center" sx={{ fontWeight: "bold" }}>
        Xác nhận đơn hàng
      </DialogTitle>
      <DialogContent>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Thông tin khách hàng</Typography>
            <Typography>👤 {customerInfo.name}</Typography>
            <Typography>📧 {customerInfo.email}</Typography>
            <Typography>📞 {customerInfo.phone}</Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">🛒 Sản phẩm trong giỏ hàng</Typography>
            {cartItems.map(({ product, quantity, voucher }) => {
              const originalPrice = product.price * quantity;
              let discount = 0;
              let discountText = "";

              if (voucher) {
                if (voucher.type === "percent") {
                  discount = (originalPrice * voucher.value) / 100;
                  discountText = `${voucher.value}%`;
                } else {
                  discount = voucher.value;
                  discountText = formatCurrency(voucher.value);
                }
              }

              return (
                <Box
                  key={product.id}
                  sx={{ py: 1, borderBottom: "1px solid #ddd" }}
                >
                  <Typography>
                    {product.name} (x{quantity})
                  </Typography>
                  <Typography color="text.secondary">
                    Giá gốc: {formatCurrency(originalPrice)}
                  </Typography>
                  {voucher && (
                    <Typography color="error">
                      Giảm giá: -{formatCurrency(discount)} ({discountText})
                    </Typography>
                  )}
                  <Typography sx={{ fontWeight: "bold", color: "#388e3c" }}>
                    Thành tiền: {formatCurrency(originalPrice - discount)}
                  </Typography>
                </Box>
              );
            })}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">💳 Thông tin thanh toán</Typography>
            <Typography>
              Phương thức: {paymentMethod === "cash" ? "💵 Tiền mặt" : "💳 Thẻ"}
            </Typography>
            <Typography color="error" fontWeight="bold">
              Tổng tiền: {formatCurrency(totalAmount)}
            </Typography>

            {paymentMethod === "cash" && (
              <>
                <Typography color="primary">
                  Số tiền khách đưa: {formatCurrency(amountReceived)}
                </Typography>
                {changeAmount !== 0 && (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: changeAmount > 0 ? "#388e3c" : "#d32f2f",
                    }}
                  >
                    {changeAmount > 0 &&
                      `Tiền thừa: ${formatCurrency(changeAmount)}`}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "center" }}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={onClose}
            color="error"
            variant="contained"
            startIcon={<Cancel />}
            sx={{ minWidth: 130, fontWeight: "bold", textTransform: "none" }}
          >
            Hủy
          </Button>
          <Button
            onClick={onOk}
            variant="contained"
            color="primary"
            startIcon={<CheckCircle />}
            sx={{
              minWidth: 170,
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#2e7d32",
            }}
          >
            Xác nhận
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOrder;
