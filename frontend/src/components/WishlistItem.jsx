import { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import useWishlistContext from "../contexts/WishlistContext";
import useCartContext from "../contexts/CartContext";
import useToastContext from "../contexts/ToastContext";

function WishlistItem({ item }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const { removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();
  const { showToast } = useToastContext();

  const handleAddToCart = async (productId, selectedSize, quantity) => {
    if (
      !selectedSize &&
      !["Books", "Electronics"].includes(item.product.category.name)
    ) {
      showToast("Please choose a size", "warning");
      return;
    }

    const result = await addToCart(productId, selectedSize, quantity);
    removeFromWishlist(productId);

    if (result.success) {
      showToast("Item moved to cart", "success");
    } else {
      showToast(result.message || "Error in add to cart", "warning");
    }
  };

  return (
    <div className="card position-relative border-0 h-100">
      <div style={{ height: "280px" }}>
        <img
          src={item.product.imageUrl}
          alt={item.product.title}
          className="w-100 h-100 img-fluid object-fit-cover"
        />
      </div>
      <div className="m-1 position-absolute end-0">
        <button
          className="p-1 text-danger bg-light border-0 rounded-circle text-secondary"
          onClick={() => removeFromWishlist(item.product._id)}
        >
          <IoMdHeart size={23} />
        </button>
      </div>

      <div className="card-body text-center d-flex flex-column justify-content-between">
        <h6 className="card-title text-truncate">{item.product.title}</h6>
        <div className="card-text fw-bold">₹{item.product.price}</div>
        {item?.product?.sizes.length > 0 && (
          <div className="mt-2 d-flex justify-content-center gap-2">
            {item.product.sizes.map((size, index) => (
              <button
                key={index}
                className={`btn btn-sm rounded-pill p-0 px-2 ${
                  selectedSize === size ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
        <button
          className="mt-3 w-100 btn btn-sm btn-primary"
          onClick={() => handleAddToCart(item.product._id, selectedSize, 1)}
        >
          Move to Cart
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;
