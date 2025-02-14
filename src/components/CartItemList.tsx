import { vouchers } from "@/mocks";
import { ICartItem, IVoucher } from "@/models";
import { Box, Typography } from "@mui/material";
import CartItem from "./CartItem";

interface CartItemListProps {
  cartItems: ICartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onSelectVoucher: (itemId: number, voucher: IVoucher | null) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  onRemove,
  onUpdateQuantity,
  onSelectVoucher,
}) => {
  const handleOnSelectVoucher = (itemId: number, voucherId: string | null) => {
    const voucher = vouchers.find((v) => v.code === voucherId) || null;
    onSelectVoucher(itemId, voucher as IVoucher | null);
  };

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
          selectedVoucher={item.voucher?.code || null}
          onSelectVoucher={handleOnSelectVoucher}
        />
      ))}
    </Box>
  );
};

export default CartItemList;
