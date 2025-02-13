import { useState } from "react";
import { MenuItem, Select, Button } from "@mui/material";

export default function ProductSelection({ setCart, cart }) {
  const [selectedProduct, setSelectedProduct] = useState("");

  const addToCart = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (product) setCart([...cart, { ...product, quantity: 1, discount: 0 }]);
  };

  return (
    <div className="space-y-2">
      <Select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        fullWidth
      >
        <MenuItem value="">Chọn sản phẩm</MenuItem>
        {products.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.name} - {p.price}đ
          </MenuItem>
        ))}
      </Select>
      <Button onClick={addToCart} variant="contained" color="primary" fullWidth>
        Thêm vào giỏ
      </Button>
    </div>
  );
}
