import { Box, Container, Paper, Typography } from "@mui/material";

const CreateOrder = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Mobile: dọc, Laptop: ngang
          width: "100%",
          gap: 3,
        }}
      >
        {/* Cột trái: Form nhập đơn hàng */}
        <Paper sx={{ p: 3, flex: 1, minWidth: { xs: "100%", md: "400px" } }}>
          <Typography variant="h6" gutterBottom>
            Thông tin đơn hàng
          </Typography>
          OrderForm
        </Paper>

        {/* Cột phải: Giỏ hàng & Tổng tiền */}
        <Paper sx={{ p: 3, flex: 0.8, minWidth: { xs: "100%", md: "300px" } }}>
          <Typography variant="h6" gutterBottom>
            Giỏ hàng & Thanh toán
          </Typography>
          CartSummary
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateOrder;
