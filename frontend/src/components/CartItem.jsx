import { useState } from "react";
import { calculatePriceAfterDiscount } from "../utils/utils";
import useCartContext from "../contexts/CartContext";
import useToastContext from "../contexts/ToastContext";
import useWishlistContext from "../contexts/WishlistContext";

function CartItem({ cartItem }) {
  console.log("cartItem: ", cartItem);

  const { quantity, size, productId } = cartItem;
  const [newQuantity, setNewQuantity] = useState(quantity);

  const { removeFromCart, updateQuantityInCart } = useCartContext();
  const { addToWishlist } = useWishlistContext();
  const { showToast } = useToastContext();

  const handleRemoveFromCart = async (productId, size) => {
    const result = await removeFromCart(productId, size);

    if (result.success) {
      showToast("Item removed from the cart!", "warning");
    } else {
      showToast(result.message || "Failed to remove item from cart", "danger");
    }
  };

  const handleQuantityChange = (type) => {
    setNewQuantity((prev) => {
      const updatedQuantity = type === "inc" ? prev + 1 : Math.max(1, prev - 1);

      updateQuantityInCart(productId._id, size, updatedQuantity);

      return updatedQuantity;
    });
  };

  const handleMoveToWishlist = async (productId, size) => {
    const result = await addToWishlist(productId);

    if (result.success) {
      showToast("Item moved to wishlist!", "success");
      removeFromCart(productId, size);
    } else {
      if (result.message === "Product already in wishlist") {
        showToast("Item moved to wishlist!", "success");
        removeFromCart(productId, size);
        return;
      }

      showToast(result.message || "Failed to add item to wishlist", "danger");
    }
  };

  return (
    <div className="card border-0 mb-5">
      <div className="row g-0">
        <div className="col-md-4" style={{ height: "40vh" }}>
          <img
            src={productId.imageUrl}
            className="w-100 h-100 img-fluid rounded-start object-fit-cover"
            alt={productId.title}
            style={{ minHeight: "180px" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            <div className="flex-grow-1">
              <h5 className="card-title">{productId.title}</h5>
              <div className="card-text">
                <span className="fw-bold fs-5">
                  ₹
                  {calculatePriceAfterDiscount(
                    productId.price,
                    productId.discountPercentage
                  )}
                </span>
                <span className="ms-2 fw-bold text-muted text-decoration-line-through">
                  ₹{productId.price}
                </span>
              </div>
              <div className="card-text text-secondary fw-bold">
                {productId.discountPercentage}% off
              </div>
              {size && (
                <div className="card-text mt-1 fw-semibold">Size: {size}</div>
              )}

              <div className="p-1 d-flex align-items-center">
                <label className="fw-semibold me-2">Quantity:</label>

                <div className="input-group" style={{ width: "130px" }}>
                  <button
                    className="btn btn-outline-secondary"
                    aria-label="Decrease quantity"
                    onClick={() => handleQuantityChange("dec")}
                    disabled={newQuantity === 1}
                  >
                    -
                  </button>

                  <input
                    type="text"
                    value={newQuantity}
                    readOnly
                    className="fw-bold form-control text-center"
                    aria-label="Selected quantity"
                  />

                  <button
                    className="btn btn-outline-secondary"
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange("inc")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                className="me-2 btn btn-sm btn-secondary"
                onClick={() => handleRemoveFromCart(productId._id, size)}
              >
                Remove from Cart
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleMoveToWishlist(productId._id, size)}
              >
                Move to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
