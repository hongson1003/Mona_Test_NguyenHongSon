import { ICustomerInfo } from "@/models";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";

interface CustomerDialogProps {
  open: boolean;
  customers: ICustomerInfo[];
  onClose: () => void;
  onSelectCustomer: (customer: ICustomerInfo) => void;
  onSkip?: () => void; // Hàm xử lý khi bấm "K nhắc lại"
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  open,
  customers,
  onClose,
  onSelectCustomer,
  onSkip,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: "300px" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chọn khách hàng
        </Typography>
        {customers.length === 0 ? (
          <Typography variant="body2">Không tìm thấy khách hàng</Typography>
        ) : (
          customers.map((customer) => (
            <Box
              key={customer.email}
              onClick={() => onSelectCustomer(customer)}
              sx={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
                "&:hover": { background: "#f0f0f0" },
              }}
            >
              <Typography>
                <strong>{customer.name}</strong>
              </Typography>
              <Typography variant="body2">
                {customer.email} - {customer.phone}
              </Typography>
            </Box>
          ))
        )}

        {/* Nút "K nhắc lại" */}
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={onSkip || onClose}
        >
          K nhắc lại
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
