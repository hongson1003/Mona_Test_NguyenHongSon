import { ICartItem } from "@/models";

export const calculateTotalPrice = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((sum, item) => {
    let itemTotal = item.product.price * item.quantity;

    if (item.voucher) {
      if (item.voucher.type === "fixed") {
        itemTotal -= item.voucher.value;
      } else if (item.voucher.type === "percent") {
        itemTotal -= (itemTotal * item.voucher.value) / 100;
      }
    }

    return sum + Math.max(itemTotal, 0);
  }, 0);
};
