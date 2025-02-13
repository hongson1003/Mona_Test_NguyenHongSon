import { products } from "@/mocks";
import { MenuItem, Select, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { Control, FieldValues } from "react-hook-form";

interface OrderFormProps {
  control: Control<FieldValues>;
}

export default function OrderForm({ control }: OrderFormProps) {
  return (
    <form>
      <Controller
        name="customerName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Tên khách hàng"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Email" fullWidth margin="normal" />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Số điện thoại"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="product"
        control={control}
        render={({ field }) => (
          <Select {...field} fullWidth displayEmpty>
            <MenuItem value="">Chọn sản phẩm</MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </form>
  );
}
