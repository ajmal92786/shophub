export function calculatePriceAfterDiscount(originalPrice, discountPercentage) {
  const discount = discountPercentage / 100;
  const discountedPrice = originalPrice - originalPrice * discount;
  return Math.floor(discountedPrice);
}
