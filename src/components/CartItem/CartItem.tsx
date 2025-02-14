import { ICartItem, IVoucher } from "@/models";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import QuantityControl from "./QuantityControl";
import VoucherSelect from "./VoucherSelect";

interface ICartItemProps {
  item: ICartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  vouchers: IVoucher[];
  onSelectVoucher: (itemId: number, voucherId: string | null) => void;
  selectedVoucher: IVoucher | null;
}

const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
  vouchers,
  onSelectVoucher,
  selectedVoucher,
}: ICartItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        pb: 2,
        mb: 2,
        gap: 2,
      }}
    >
      <ProductImage src={item.product.imageSrc} alt={item.product.name} />
      <Box sx={{ flex: 1 }}>
        <ProductInfo product={item.product} selectedVoucher={selectedVoucher} />
        <VoucherSelect
          itemId={item.id}
          vouchers={vouchers}
          selectedVoucher={selectedVoucher}
          onSelectVoucher={onSelectVoucher}
        />
        <QuantityControl
          itemId={item.id}
          quantity={item.quantity}
          onUpdateQuantity={onUpdateQuantity}
        />
      </Box>
      <Box
        sx={{
          alignSelf: "flex-start",
        }}
      >
        <IconButton color="error" onClick={() => onRemove(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
