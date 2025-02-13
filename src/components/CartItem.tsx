import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({
  item,
  onRemove,
}: {
  item: any;
  onRemove: (id: number) => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        pb: 1,
        mb: 1,
      }}
    >
      <Box>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {item.price.toLocaleString()} VND x {item.quantity}
        </Typography>
      </Box>

      <IconButton color="error" onClick={() => onRemove(item.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;
