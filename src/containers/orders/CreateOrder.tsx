import { ConfirmOrderModal, SectionTitle } from "@/components";
import { ICartProduct, IOrderForm, PaymentMethod } from "@/models";
import { RootState, setCarts } from "@/store";
import { calculateTotalPrice } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";

const defaultValues: IOrderForm = {
  name: "",
  email: "",
  phone: "",
  amountReceived: 0,
  paymentMethod: "cash",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Họ tên không được để trống")
    .min(2, "Họ tên quá ngắn"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup
    .string()
    .matches(/^\d{10,}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),

  paymentMethod: yup
    .mixed<PaymentMethod>()
    .oneOf(["cash", "card"])
    .required("Phương thức thanh toán không được để trống"),
});

const CreateOrder = () => {
  const methods = useForm<IOrderForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.items);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const rawAmountReceived = methods.watch("amountReceived") || "";
  const amountReceived =
    typeof rawAmountReceived === "string"
      ? parseInt(rawAmountReceived.replace(/[^0-9]/g, ""), 10) || 0
      : rawAmountReceived;

  const handleSelectProducts = (products: ICartProduct[]) => {
    dispatch(setCarts(products.map((p) => ({ id: p.id }))));
  };

  const handleCheckout = methods.handleSubmit(() => {
    console.log("Checkout", methods.getValues());
    const total = calculateTotalPrice(carts);
    if (total > amountReceived) {
      return toast.error("Số tiền nhận phải lớn hơn hoặc bằng tổng tiền");
    } else if (carts.length === 0) {
      return toast.error("Vui lòng chọn sản phẩm");
    }

    console.log("Checkout", methods.getValues());
    setConfirmModalOpen(true);
  });

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  const handleOnOk = () => {
    dispatch(setCarts([]));
    methods.reset({
      ...defaultValues,
    });
    setConfirmModalOpen(false);

    toast.success("Đã tạo đơn hàng thành công");
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
        cartItems={carts}
        open={isConfirmModalOpen}
        customerInfo={orderData}
        paymentMethod={orderData.paymentMethod}
        amountReceived={amountReceived}
        onClose={handleCloseModal}
        onOk={handleOnOk}
      />
    </>
  );
};

export default CreateOrder;
