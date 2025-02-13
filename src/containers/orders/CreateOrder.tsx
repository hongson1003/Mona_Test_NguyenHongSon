import { SectionTitle } from "@/components";
import { Box, Container } from "@mui/material";
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";

const CreateOrder = () => {
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
          <OrderForm />
        </Box>

        {/* Giỏ hàng */}
        <Box sx={{ flex: 0.8, minWidth: { xs: "100%", md: "300px" } }}>
          <CartSummary />
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOrder;
