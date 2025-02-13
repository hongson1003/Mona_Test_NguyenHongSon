import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomerInfo from "../../components/CustomerInfo";
import PaymentForm from "../../components/PaymentForm";

const OrderForm = () => {
  const methods = useForm({
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      paymentMethod: "cash",
      amountReceived: 0,
    },
  });

  const [orderData, setOrderData] = useState(null);

  const onSubmit = (data: any) => {
    setOrderData(data);
    console.log("Order Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Paper cho thông tin khách hàng */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin khách hàng
          </Typography>
          <CustomerInfo />
        </Paper>

        {/* Paper cho phương thức thanh toán */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Phương thức thanh toán
          </Typography>
          <PaymentForm />
        </Paper>

        {/* Nút thanh toán */}
        <Button
          variant="contained"
          color="primary"
          onClick={methods.handleSubmit(onSubmit)}
        >
          Thanh toán
        </Button>
      </Box>
    </FormProvider>
  );
};

export default OrderForm;
