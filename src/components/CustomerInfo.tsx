import { TextField, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

const CustomerInfo = () => {
  const { register } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Tên khách hàng"
        {...register("customerName")}
        fullWidth
      />
      <TextField label="Email" {...register("email")} fullWidth />
      <TextField label="Số điện thoại" {...register("phone")} fullWidth />
    </Box>
  );
};

export default CustomerInfo;
