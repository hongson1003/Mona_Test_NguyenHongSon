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
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const { control, setValue } = useFormContext();
  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  // Lấy số tiền khách đưa, đảm bảo chuyển về số
  const rawAmountReceived =
    useWatch({ control, name: "amountReceived", defaultValue: 0 }) ?? 0;
  const amountReceived =
    typeof rawAmountReceived === "string"
      ? parseInt(rawAmountReceived.replace(/[^0-9]/g, ""), 10) || 0
      : rawAmountReceived;

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useMemo(
    () => calculateTotalPrice(cartItems) ?? 0,
    [cartItems]
  );

  // Tính tiền thừa
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
                value={field.value ?? ""}
                onValueChange={(values) => {
                  const numericValue = values.floatValue ?? 0;
                  setValue("amountReceived", numericValue, {
                    shouldValidate: true,
                  });
                }}
              />
            )}
          />

          {/* Chỉ hiển thị tiền thừa khi số tiền khách đưa > tổng tiền */}
          {changeAmount > 0 && (
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
