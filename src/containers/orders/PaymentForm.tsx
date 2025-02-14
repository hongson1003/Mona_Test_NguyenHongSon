import { RootState } from "@/store";
import { calculateTotalPrice } from "@/utils";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const { control, register } = useFormContext();
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const amountReceived = Number(
    useWatch({ control, name: "amountReceived" }) || 0
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Tính tổng tiền giỏ hàng
  const totalAmount = useMemo(
    () => calculateTotalPrice(cartItems),
    [cartItems]
  );

  const changeAmount = amountReceived - totalAmount;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Chọn phương thức thanh toán */}
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} row>
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Tiền mặt"
            />
            <FormControlLabel value="card" control={<Radio />} label="Thẻ" />
          </RadioGroup>
        )}
      />

      {/* Nếu chọn tiền mặt, hiển thị ô nhập tiền */}
      {paymentMethod === "cash" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            label="Số tiền khách đưa"
            type="number"
            {...register("amountReceived")}
            fullWidth
          />
          <Typography
            variant="body1"
            color={changeAmount < 0 ? "error" : "primary"}
          >
            {changeAmount < 0
              ? `Còn thiếu: ${Math.abs(changeAmount).toLocaleString()} VND`
              : `Tiền thừa: ${changeAmount.toLocaleString()} VND`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;
