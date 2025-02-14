import { ICartProduct } from "@/models";
import { Check, Clear } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

interface IProductSelectProps {
  products: ICartProduct[];
  onChange: (products: ICartProduct[]) => void;
}

const ProductSelect = ({ products, onChange }: IProductSelectProps) => {
  console.log("ProductSelect render");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleChange = (event: any) => {
    const newSelectedIds = event.target.value as number[];
    if (
      newSelectedIds.length !== selectedIds.length ||
      !newSelectedIds.every((id) => selectedIds.includes(id))
    ) {
      setSelectedIds(newSelectedIds);
      onChange(products.filter((p) => newSelectedIds.includes(p.id)));
    }
  };

  // Xử lý khi chọn "Xóa toàn bộ"
  const handleClearSelection = (event: React.MouseEvent) => {
    event.preventDefault(); // Ngăn Select bị đóng
    event.stopPropagation(); // Ngăn chặn sự kiện onChange của Select
    console.log("Xóa toàn bộ");
    setSelectedIds([]);
    onChange([]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Chọn sản phẩm</InputLabel>
      <Select
        multiple
        value={selectedIds}
        onChange={handleChange}
        renderValue={(selected) =>
          products
            .filter((p) => selected.includes(p.id))
            .map((p) => p.name)
            .join(", ")
        }
      >
        {/* Nút xóa toàn bộ */}
        {selectedIds.length > 0 && (
          <MenuItem onMouseDown={handleClearSelection} sx={{ color: "red" }}>
            <ListItemIcon>
              <Clear sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Xóa toàn bộ" />
          </MenuItem>
        )}

        {/* Danh sách sản phẩm */}
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id} sx={{ py: 1 }}>
            <ListItemIcon>
              {selectedIds.includes(product.id) && (
                <Check sx={{ color: "green" }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={`${
                product.name
              } - ${product.price.toLocaleString()} VND`}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSelect;
