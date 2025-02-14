import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface ICustomerInfoProps {
  children?: React.ReactNode;
}

const CustomerInfo = ({ children }: ICustomerInfoProps) => {
  const { register } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Tên khách hàng" {...register("name")} fullWidth />
      <TextField label="Email" {...register("email")} fullWidth />
      <TextField label="Số điện thoại" {...register("phone")} fullWidth />

      {children}
    </Box>
  );
};

export default CustomerInfo;
