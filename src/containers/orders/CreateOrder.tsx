import { SectionTitle } from "@/components";
import { ICartProduct, IOrderForm } from "@/models";
import { setCarts } from "@/store";
import { Box, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";

const defaultValues: IOrderForm = {
  name: "",
  email: "",
  phone: "",
  amountReceived: 0,
  paymentMethod: "cash",
  products: [],
};

const CreateOrder = () => {
  const methods = useForm<IOrderForm>({
    defaultValues: defaultValues,
  });
  const dispatch = useDispatch();

  const handleSelectProducts = (products: ICartProduct[]) => {
    methods.setValue(
      "products",
      products.map((p) => p.id)
    );

    const productCarts = products.map((p) => ({
      id: p.id,
    }));

    dispatch(setCarts(productCarts));
  };

  const handleCheckout = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
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
