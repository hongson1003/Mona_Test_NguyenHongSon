import { ICartItem, IVoucher } from "@/models";
import { Box, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { vouchers } from "@/mocks";

interface CartItemListProps {
  cartItems: ICartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  onRemove,
  onUpdateQuantity,
}) => {
  return cartItems.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        gap: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        p: 3,
      }}
    >
      <img
        src="/images/empty-cart.png"
        alt="Giỏ hàng trống"
        width={150}
        height={150}
        style={{ opacity: 0.8 }}
      />
      <Typography variant="h6" color="textSecondary">
        Giỏ hàng của bạn đang trống
      </Typography>
    </Box>
  ) : (
    <Box>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
          vouchers={vouchers as IVoucher[]}
        />
      ))}
    </Box>
  );
};

export default CartItemList;
