import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { Control, FieldValues } from "react-hook-form";

interface OrderFormProps {
  control: Control<FieldValues>;
}

export default function OrderForm({ control }: OrderFormProps) {
  return (
    <div className="space-y-4">
      <Controller
        name="customerName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Tên khách hàng"
            fullWidth
            variant="outlined"
          />
        )}
      />
      <Controller
        name="customerEmail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
        )}
      />
      <Controller
        name="customerPhone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Số điện thoại"
            type="tel"
            fullWidth
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
