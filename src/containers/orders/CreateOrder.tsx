import { ConfirmOrderModal, SectionTitle } from "@/components";
import { ICartProduct, IOrderForm } from "@/models";
import { RootState, setCarts } from "@/store";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
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
  const methods = useForm<IOrderForm>({ defaultValues });
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.items);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    methods.setValue("cartItems", carts);
  }, [carts]);

  const handleSelectProducts = (products: ICartProduct[]) => {
    dispatch(setCarts(products.map((p) => ({ id: p.id }))));
  };

  const handleCheckout = methods.handleSubmit(() => {
    setConfirmModalOpen(true);
  });

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  const handleOnOk = () => {
    dispatch(setCarts([]));
    methods.reset();
    setConfirmModalOpen(false);

    alert("Đã tạo đơn hàng thành công!");
  };

  const orderData = methods.getValues();

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
        <SectionTitle title="Tạo Đơn Hàng Mới" />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "400px" } }}>
            <OrderForm
              methods={methods}
              onSelectProducts={handleSelectProducts}
              productIdValues={carts.map((c) => c.product.id)}
            />
          </Box>

          <Box sx={{ flex: 0.8, minWidth: { xs: "100%", md: "300px" } }}>
            <CartSummary onCheckout={handleCheckout} />
          </Box>
        </Box>
      </Container>

      <ConfirmOrderModal
        cartItems={orderData.cartItems}
        open={isConfirmModalOpen}
        customerInfo={orderData}
        paymentMethod={orderData.paymentMethod}
        amountReceived={orderData.amountReceived}
        onClose={handleCloseModal}
        onOk={handleOnOk}
      />
    </>
  );
};

export default CreateOrder;
