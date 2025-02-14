import { ICartItem } from "@/models";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: ICartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}) => {
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
      {/* Ảnh sản phẩm */}
      <img
        src={item.product.imageSrc}
        alt={item.product.name}
        width={60}
        height={60}
        style={{ borderRadius: 8 }}
      />

      {/* Thông tin sản phẩm */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{item.product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {item.product.price.toLocaleString()} VND
        </Typography>

        {/* Nút tăng giảm số lượng */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Xóa sản phẩm */}
      <IconButton color="error" onClick={() => onRemove(item.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;
