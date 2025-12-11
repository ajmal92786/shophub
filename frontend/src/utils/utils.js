export function calculatePriceAfterDiscount(originalPrice, discountPercentage) {
  const discount = discountPercentage / 100;
  const discountedPrice = originalPrice - originalPrice * discount;
  return Math.floor(discountedPrice);
}

export const calculateTotalPrice = (items, deliveryCharges = 499) => {
  const totalPriceBeforeDiscount = items.reduce(
    (sum, curr) => sum + curr.productId.price * curr.quantity,
    0
  );

  const totalPriceAfterDiscount = items.reduce(
    (sum, curr) =>
      sum +
      calculatePriceAfterDiscount(
        curr.productId.price,
        curr.productId.discountPercentage
      ) *
        curr.quantity,
    0
  );

  const totalDiscount = totalPriceBeforeDiscount - totalPriceAfterDiscount;
  const totalAmount = totalPriceAfterDiscount + deliveryCharges;

  return { totalDiscount, totalPriceAfterDiscount, totalAmount };
};
