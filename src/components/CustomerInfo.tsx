import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomerInfoProps {
  children?: React.ReactNode;
}

const CustomerInfo = ({ children }: ICustomerInfoProps) => {
  const { control } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Tên khách hàng"
            fullWidth
            InputLabelProps={{
              shrink: field.value ? true : undefined,
            }}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            InputLabelProps={{
              shrink: field.value ? true : undefined,
            }}
          />
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
            InputLabelProps={{
              shrink: field.value ? true : undefined,
            }}
          />
        )}
      />

      {children}
    </Box>
  );
};

export default CustomerInfo;
