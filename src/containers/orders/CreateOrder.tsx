import { CartSummary, OrderForm } from "@/components";
import { Box, Container, Typography } from "@mui/material";

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
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: "80px",
            height: "4px",
            backgroundColor: "primary.main",
            margin: "8px auto 0",
            borderRadius: "2px",
          },
        }}
      >
        Tạo Đơn Hàng Mới
      </Typography>

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
