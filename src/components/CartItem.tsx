import { ICartItem } from "@/models";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";

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
            gap: 1.5,
          }}
        >
          <IconButton
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "4px",
              minWidth: 32,
              minHeight: 32,
            }}
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              px: 1.5,
              textAlign: "center",
              minWidth: 24,
            }}
          >
            {item.quantity}
          </Typography>

          <IconButton
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "4px",
              minWidth: 32,
              minHeight: 32,
            }}
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <AddIcon fontSize="small" />
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
