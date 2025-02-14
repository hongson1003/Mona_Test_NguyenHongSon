import { ICartProduct } from "@/models";
import { formatCurrency } from "@/utils";
import { Typography } from "@mui/material";

interface ProductInfoProps {
  product: ICartProduct;
  selectedVoucher: string | null;
}

const ProductInfo = ({ product, selectedVoucher }: ProductInfoProps) => {
  const formattedPrice = formatCurrency(product.price);
  const discount = selectedVoucher ? 50000 : 0; // Thay bằng logic tính giảm giá
  const finalPrice = formatCurrency(product.price - discount);

  return (
    <>
      <Typography variant="subtitle1">{product.name}</Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textDecoration: discount ? "line-through" : "none" }}
      >
        {formattedPrice}
      </Typography>
      {discount > 0 && (
        <Typography variant="body2" color="error">
          {finalPrice} (-{formatCurrency(discount)})
        </Typography>
      )}
    </>
  );
};

export default ProductInfo;
