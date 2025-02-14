import { ConfirmOrderModal, SectionTitle } from "@/components";
import { ICartProduct, IOrderForm, PaymentMethod } from "@/models";
import { RootState, setCarts } from "@/store";
import { calculateTotalPrice } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";

interface FlyingProduct {
  id: number;
  name: string;
  image: string;
  x: number;
  y: number;
  cartX: number;
  cartY: number;
}

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

  const [flyingProduct, setFlyingProduct] = useState<FlyingProduct | null>(
    null
  );

  const handleSelectProducts = (products: ICartProduct[]) => {
    const previousCartIds = new Set(carts.map((c) => c.id));
    const newProduct = products.find((p) => !previousCartIds.has(p.id));

    dispatch(setCarts(products.map((p) => ({ id: p.id }))));

    if (!newProduct) return; // Nếu không có sản phẩm mới, không chạy hiệu ứng

    const cartList = document.getElementById("cart-item-list");

    setFlyingProduct({
      id: newProduct.id + Math.random(),
      name: newProduct.name,
      image: newProduct.imageSrc,
      x: 0,
      y: 0,
      cartX: cartList?.offsetLeft || 0,
      cartY: cartList?.offsetTop || 0,
    });

    setTimeout(() => {
      setFlyingProduct(null);
    }, 1000);
  };

  const handleCheckout = methods.handleSubmit(() => {
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

      {flyingProduct && (
        <>
          <motion.img
            src={flyingProduct.image}
            initial={{ x: flyingProduct.x, y: flyingProduct.y, scale: 1 }}
            animate={{
              x: flyingProduct.cartX,
              y: flyingProduct.cartY,
              scale: 0.2,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed w-24 h-24 rounded-full shadow-lg"
            style={{ zIndex: 1000, top: 0, left: 0, position: "fixed" }}
          />
        </>
      )}
    </>
  );
};

export default CreateOrder;
