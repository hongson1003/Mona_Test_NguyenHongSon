import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const PaymentForm = () => {
  const { control, register } = useFormContext();
  const paymentMethod = useWatch({ control, name: "paymentMethod" });

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
        <TextField
          label="Số tiền khách đưa"
          type="number"
          {...register("amountReceived")}
          fullWidth
        />
      )}
    </Box>
  );
};

export default PaymentForm;
