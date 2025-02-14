# Mona_Test_NguyenHongSon

# Create Order - Hệ Thống Tạo Đơn Hàng

## Giới Thiệu

Chức năng "Tạo Đơn Hàng" cho phép người dùng chọn sản phẩm, nhập thông tin khách hàng, chọn phương thức thanh toán và xác nhận đặt hàng. Hệ thống hỗ trợ tính toán tổng tiền, kiểm tra số tiền nhận, và hiển thị hiệu ứng sản phẩm bay vào giỏ hàng khi thêm sản phẩm mới.

## Công Nghệ Sử Dụng

- **React** với **Next.js**
- **Redux Toolkit** để quản lý trạng thái giỏ hàng
- **React Hook Form** với **Yup** để xử lý form
- **Framer Motion** để tạo hiệu ứng sản phẩm bay
- **Material UI** để thiết kế giao diện
- **React Toastify** để hiển thị thông báo

## Cài Đặt

1. Cài đặt dependencies:
   ```sh
   npm install
   ```
2. Chạy ứng dụng:
   ```sh
   npm run dev
   ```

## Cấu Trúc Mã Nguồn

```
/components
  ├── ConfirmOrderModal.tsx    # Modal xác nhận đơn hàng
  ├── SectionTitle.tsx          # Tiêu đề của các section
  ├── CartSummary.tsx           # Hiển thị tổng hợp giỏ hàng
  ├── OrderForm.tsx             # Form nhập thông tin đơn hàng
  ├── ...
/pages
  ├── CreateOrder.tsx           # Trang tạo đơn hàng
  ├── ...
/store
  ├── cartSlice.ts              # Redux slice quản lý giỏ hàng
  ├── ...
/utils
  ├── calculateTotalPrice.ts    # Hàm tính tổng giá trị đơn hàng
  ├── ...
```

## Chức Năng Chính

1. **Chọn sản phẩm**: Người dùng có thể chọn sản phẩm và thêm vào giỏ hàng.
2. **Nhập thông tin khách hàng**: Gồm họ tên, email, số điện thoại.
3. **Chọn phương thức thanh toán**: Hỗ trợ "cash" và "card".
4. **Kiểm tra số tiền nhận**: Hệ thống kiểm tra nếu số tiền nhận đủ để thanh toán.
5. **Hiệu ứng sản phẩm bay vào giỏ hàng**: Khi thêm mới sản phẩm, hình ảnh sản phẩm sẽ bay về giỏ hàng.
6. **Xác nhận đơn hàng**: Hiển thị thông tin đơn hàng trước khi xác nhận.
7. **Thông báo thành công hoặc lỗi**: Dùng Toastify để hiển thị trạng thái đơn hàng.

### **🎯 Cải tiến so với bản cũ**

✅ **Thêm hỗ trợ voucher** trong chức năng đặt hàng.  
✅ **Cập nhật cấu trúc mã nguồn**, thêm `voucherSlice.ts` và `applyVoucher.ts`.  
✅ **Hướng dẫn cách nhập mã giảm giá** cho người dùng.  
✅ **Lưu ý về giới hạn của voucher** (ngày hết hạn, số lần sử dụng, v.v.).

## Hướng Dẫn Sử Dụng

1. Mở trang "Tạo Đơn Hàng".
2. Chọn sản phẩm muốn mua.
3. Nhập thông tin khách hàng và chọn phương thức thanh toán.
4. Nhập số tiền nhận nếu thanh toán bằng tiền mặt.
5. Nhấn nút "Đặt Hàng" để kiểm tra thông tin và xác nhận.

## Ghi Chú

- Khi xóa sản phẩm khỏi giỏ hàng, hiệu ứng bay sẽ không xuất hiện.
- Nếu số tiền nhận nhỏ hơn tổng tiền, hệ thống sẽ hiển thị lỗi.

## Đóng Góp

Nếu bạn muốn đóng góp hoặc cải tiến tính năng, hãy tạo một Pull Request hoặc báo lỗi trong repository.

---

**Tác giả:** Nguyễn Hồng Sơn
