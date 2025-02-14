import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const PaymentForm = ({ totalAmount }: { totalAmount: number }) => {
  const { control, register } = useFormContext();
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const amountReceived = useWatch({ control, name: "amountReceived" }) || 0;

  // Tính số tiền dư
  const changeAmount = Number(amountReceived) - totalAmount;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
