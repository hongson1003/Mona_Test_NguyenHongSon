import { SectionTitle } from "@/components";
import { Box, Container } from "@mui/material";
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";
import { useForm } from "react-hook-form";
import { ICartProduct, IOrderForm } from "@/models";
import { useState } from "react";

const defaultValues: IOrderForm = {
  name: "",
  email: "",
  phone: "",
  amountReceived: 0,
  paymentMethod: "percentage",
};

const CreateOrder = () => {
  const methods = useForm<IOrderForm>({
    defaultValues: defaultValues,
  });

  const [selectedProducts, setSelectedProducts] = useState<ICartProduct[]>([]);

  const handleSelectProducts = (products: ICartProduct[]) => {
    setSelectedProducts(products);
  };

  const handleCheckout = methods.handleSubmit((data) => {
    console.log("Dữ liệu đơn hàng:", {
      customerInfo: data,
      products: selectedProducts,
    });
    alert("Đơn hàng đã được xử lý!");
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Tiêu đề */}
      <SectionTitle title="Tạo Đơn Hàng Mới" />

      {/* Nội dung */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        {/* Form đặt hàng */}
        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "400px" } }}>
          <OrderForm
            methods={methods}
            onSelectProducts={handleSelectProducts}
          />
        </Box>

        {/* Giỏ hàng */}
        <Box sx={{ flex: 0.8, minWidth: { xs: "100%", md: "300px" } }}>
          <CartSummary onCheckout={handleCheckout} />
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOrder;
