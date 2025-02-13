import { CustomerInfo, PaymentForm, ProductSelect } from "@/components";
import { products } from "@/mocks";
import { Box, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

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

  // const [orderData, setOrderData] = useState(null);

  // const onSubmit = (data: any) => {
  //   setOrderData(data);
  //   console.log("Order Data:", data);
  // };

  const handleOnChangeProduct = (product: any) => {
    console.log("Selected Product:", product);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Paper cho thông tin khách hàng */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin khách hàng
          </Typography>
          <CustomerInfo>
            {/* Component ProductSelect */}
            <ProductSelect
              products={products}
              onChange={handleOnChangeProduct}
            />
          </CustomerInfo>
        </Paper>

        {/* Paper cho phương thức thanh toán */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Phương thức thanh toán
          </Typography>
          <PaymentForm />
        </Paper>
      </Box>
    </FormProvider>
  );
};

export default OrderForm;
