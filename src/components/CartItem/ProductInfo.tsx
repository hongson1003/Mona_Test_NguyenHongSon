import { ICartProduct, IVoucher } from "@/models";
import { formatCurrency } from "@/utils";
import { Typography, Box } from "@mui/material";

interface IProductInfoProps {
  product: ICartProduct;
  selectedVoucher: IVoucher | null;
}

const ProductInfo = ({ product, selectedVoucher }: IProductInfoProps) => {
  const formattedPrice = formatCurrency(product.price);

  // Tính toán giảm giá
  let discount = 0;
  if (selectedVoucher) {
    discount =
      selectedVoucher.type === "fixed"
        ? selectedVoucher.value
        : Math.round((selectedVoucher.value / 100) * product.price); // Làm tròn số tiền giảm
  }

  const finalPriceValue = Math.max(0, product.price - discount);
  const formattedFinalPrice = formatCurrency(finalPriceValue);

  return (
    <Box>
      <Typography variant="subtitle1">{product.name}</Typography>

      {/* Giá gạch ngang nếu có giảm giá */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textDecoration: discount > 0 ? "line-through" : "none" }}
      >
        {formattedPrice}
      </Typography>

      {/* Hiển thị giá đã giảm */}
      {discount > 0 && (
        <Typography variant="h6" color="primary" fontWeight="bold">
          {formattedFinalPrice}{" "}
          <Typography variant="caption" color="error">
            (-{formatCurrency(discount)})
          </Typography>
        </Typography>
      )}

      {/* Hiển thị voucher đã áp dụng */}
      <Typography variant="body2" color="textSecondary">
        {selectedVoucher ? (
          <>
            ✅ Đã áp dụng: <strong>{selectedVoucher.code}</strong> (
            {selectedVoucher.type === "fixed"
              ? `giảm ${formatCurrency(selectedVoucher.value)}`
              : `giảm ${selectedVoucher.value}%`}
            )
          </>
        ) : (
          "❌ Không áp dụng voucher"
        )}
      </Typography>
    </Box>
  );
};

export default ProductInfo;
