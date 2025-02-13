import { ICartProduct } from "@/models";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface IProductSelectProps {
  products: ICartProduct[];
  onChange: (products: ICartProduct[]) => void;
}

const ProductSelect = ({ products, onChange }: IProductSelectProps) => {
  const [selectedProducts, setSelectedProducts] = useState<ICartProduct[]>([]);

  const handleChange = (event: any) => {
    const selectedIds = event.target.value as number[];
    const selectedItems = products.filter((p) => selectedIds.includes(p.id));

    setSelectedProducts(selectedItems);
    onChange(selectedItems);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Chọn sản phẩm</InputLabel>
      <Select
        multiple
        value={selectedProducts.map((p) => p.id)}
        onChange={handleChange}
      >
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.name} - {product.price.toLocaleString()} VND
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSelect;
