import { ICartProduct } from "@/models";
import { Check } from "@mui/icons-material";
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
