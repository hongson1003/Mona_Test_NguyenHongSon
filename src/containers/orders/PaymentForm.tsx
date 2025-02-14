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
import { useMemo, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const { control, setValue } = useFormContext();
  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Tính tổng tiền giỏ hàng
  const totalAmount = useMemo(
    () => calculateTotalPrice(cartItems),
    [cartItems]
  );

  // State lưu số tiền nhập vào
  const [amountReceived, setAmountReceived] = useState(0);

  // Tính số tiền thừa
  const changeAmount = useMemo(
    () => amountReceived - totalAmount,
    [amountReceived, totalAmount]
  );

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
          <Controller
            name="amountReceived"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                label="Số tiền khách đưa"
                thousandSeparator=","
                decimalScale={0}
                allowNegative={false}
                suffix=" VND"
                fullWidth
                value={amountReceived || ""}
                onValueChange={(values) => {
                  const value = values.floatValue || 0;
                  setAmountReceived(value);
                  setValue("amountReceived", value);
                }}
              />
            )}
          />

          {/* Chỉ hiển thị tiền thừa khi số tiền khách đưa > tổng tiền */}
          {amountReceived > totalAmount && (
            <Typography variant="body1" color="primary" fontWeight="bold">
              Tiền thừa trả khách: {changeAmount.toLocaleString()} VND
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;
