import { ConfirmOrderModal, SectionTitle } from "@/components";
import { ICartProduct, IOrderForm } from "@/models";
import { RootState, setCarts } from "@/store";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";

const defaultValues: IOrderForm = {
  name: "",
  email: "",
  phone: "",
  amountReceived: 0,
  paymentMethod: "cash",
  cartItems: [],
};

const CreateOrder = () => {
  const methods = useForm<IOrderForm>({
    defaultValues: defaultValues,
  });
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    methods.setValue("cartItems", carts);
  }, [carts]);

  const handleSelectProducts = (products: ICartProduct[]) => {
    const productCarts = products.map((p) => ({
      id: p.id,
    }));

    dispatch(setCarts(productCarts));
  };

  const handleCheckout = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
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
              productIdValues={carts.map((c) => c.product.id)}
            />
          </Box>

          {/* Giỏ hàng */}
          <Box sx={{ flex: 0.8, minWidth: { xs: "100%", md: "300px" } }}>
            <CartSummary onCheckout={handleCheckout} />
          </Box>
        </Box>
      </Container>

      <ConfirmOrderModal
        cartItems={methods.getValues("cartItems")}
        open={true}
        customerInfo={methods.getValues()}
        paymentMethod={methods.getValues("paymentMethod")}
        amountReceived={methods.getValues("amountReceived")}
        onClose={() => {}}
      />
    </>
  );
};

export default CreateOrder;
