import { IVoucher } from "@/models";
import { formatCurrency } from "@/utils";
import { MenuItem, Select, Tooltip } from "@mui/material";

interface IVoucherSelectProps {
  itemId: number;
  vouchers: IVoucher[];
  selectedVoucher: IVoucher | null;
  onSelectVoucher: (itemId: number, voucher: string | null) => void;
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
      value={selectedVoucher?.code ?? "none"}
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
          <Tooltip title={`Mã: ${voucher.code}`} arrow>
            <span>
              {voucher.code} - Giảm{" "}
              {voucher.type === "fixed"
                ? formatCurrency(voucher.value)
                : `${voucher.value}%`}
            </span>
          </Tooltip>
        </MenuItem>
      ))}
    </Select>
  );
};

export default VoucherSelect;
