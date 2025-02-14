import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";

interface IQuantityControlProps {
  itemId: number;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const QuantityControl = ({
  itemId,
  quantity,
  onUpdateQuantity,
}: IQuantityControlProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1.5 }}>
      <IconButton
        sx={iconButtonStyle}
        size="small"
        onClick={() => onUpdateQuantity(itemId, quantity - 1)}
        disabled={quantity <= 1}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography sx={quantityTextStyle}>{quantity}</Typography>
      <IconButton
        sx={iconButtonStyle}
        size="small"
        onClick={() => onUpdateQuantity(itemId, quantity + 1)}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;

// Style
const iconButtonStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "4px",
  minWidth: 32,
  minHeight: 32,
};

const quantityTextStyle = {
  fontSize: "1rem",
  fontWeight: 500,
  px: 1.5,
  textAlign: "center",
  minWidth: 24,
};
