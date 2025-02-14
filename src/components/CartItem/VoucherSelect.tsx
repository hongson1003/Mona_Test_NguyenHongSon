import { IVoucher } from "@/models";
import { MenuItem, Select } from "@mui/material";
import { formatCurrency } from "@/utils";

interface IVoucherSelectProps {
  itemId: number;
  vouchers: IVoucher[];
  selectedVoucher: string | null;
  onSelectVoucher: (itemId: number, voucherId: string | null) => void;
}

const VoucherSelect = ({
  itemId,
  vouchers,
  selectedVoucher,
  onSelectVoucher,
}: IVoucherSelectProps) => {
  return (
    <Select
      fullWidth
      size="small"
      sx={{ mt: 1 }}
      value={selectedVoucher ?? "none"}
      onChange={(e) =>
        onSelectVoucher(
          itemId,
          e.target.value === "none" ? null : e.target.value
        )
      }
    >
      <MenuItem value="none">Không sử dụng voucher</MenuItem>
      {vouchers.map((voucher) => (
        <MenuItem key={voucher.code} value={voucher.code}>
          {voucher.code} - Giảm{" "}
          {voucher.type === "fixed"
            ? formatCurrency(voucher.value)
            : `${voucher.value}%`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default VoucherSelect;
