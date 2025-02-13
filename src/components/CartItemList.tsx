import { Typography } from "@mui/material";
import CartItem from "./CartItem";

interface CartItemListProps {
  cartItems: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    discount: number;
  }[];
  onRemove: (id: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems, onRemove }) => {
  return cartItems.length === 0 ? (
    <Typography>Giỏ hàng trống</Typography>
  ) : (
    cartItems.map((item) => (
      <CartItem key={item.id} item={item} onRemove={onRemove} />
    ))
  );
};

export default CartItemList;
