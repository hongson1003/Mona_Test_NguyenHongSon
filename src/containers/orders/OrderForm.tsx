import { CustomerInfo, ProductSelect } from "@/components";
import { products } from "@/mocks";
import { ICartProduct, IOrderForm } from "@/models";
import { Box, Paper, Typography } from "@mui/material";
import { FormProvider, UseFormReturn } from "react-hook-form";
import PaymentForm from "./PaymentForm";

interface IOrderFormProps {
  methods: UseFormReturn<IOrderForm>;
  onSelectProducts: (products: ICartProduct[]) => void;
  productIdValues?: number[];
}

const OrderForm = ({
  methods,
  onSelectProducts,
  productIdValues,
}: IOrderFormProps) => {
  const handleOnChangeProduct = (selectedProducts: ICartProduct[]) => {
    onSelectProducts(selectedProducts);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Paper cho thông tin khách hàng */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin khách hàng
          </Typography>
          <CustomerInfo>
            {/* Component ProductSelect */}
            <ProductSelect
              products={products}
              onChange={handleOnChangeProduct}
              productIdValues={productIdValues}
            />
          </CustomerInfo>
        </Paper>

        {/* Paper cho phương thức thanh toán */}
        <Paper sx={{ p: 2 }}>
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
