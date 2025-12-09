import { useState } from "react";
import useCartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import useToastContext from "../contexts/ToastContext";
import useWishlistContext from "../contexts/WishlistContext";

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCartContext();
  const { wishlistIds, addToWishlist, removeFromWishlist } =
    useWishlistContext();
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  const handleAddToCart = async (productId, size, quantity) => {
    if (
      !selectedSize &&
      !["Books", "Electronics"].includes(product.category.name)
    ) {
      showToast("Please choose a size", "warning");
      return;
    }

    const result = await addToCart(productId, size, quantity);

    if (result.success) {
      showToast("Item added to the cart!", "success");
    } else {
      showToast(result.message || "Failed to add to cart", "warning");
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (wishlistIds.includes(product._id)) {
      const result = await removeFromWishlist(productId);
      if (result.success) {
        showToast("Item removed from wishlist!", "warning");
      } else {
        showToast(
          result?.message || "Error in removing from wishlist",
          "warning"
        );
      }
    } else {
      const result = await addToWishlist(productId);
      if (result.success) {
        showToast("Item added to wishlist!", "success");
      } else {
        showToast(result?.message || "Error in add to wishlist", "warning");
      }
    }
  };

  return (
    <div
      className="card h-100 shadow-sm rounded position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/products/details/${product._id}`)}
    >
      {wishlistIds.includes(product._id) ? (
        <button
          className="p-1 bg-transparent border-0 text-danger position-absolute top-0 end-0"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(product._id);
          }}
        >
          <IoMdHeart size={26} />
        </button>
      ) : (
        <button
          className="m-1 bg-transparent border-0 text-white position-absolute top-0 end-0"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(product._id);
          }}
        >
          <FaRegHeart size={22} />
        </button>
      )}

      <img
        src={product.imageUrl}
        alt={product.title}
        className="card-img-top object-fit-cover"
        style={{ height: "250px" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.title}</h5>

        <div className="mb-2 card-text d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{product.price}</span>
          <span
            className="px-2 bg-success-subtle text-success-emphasis d-flex align-items-center border rounded-pill"
            aria-label={`Rating ${product.rating} stars`}
          >
            {product.rating} <IoMdStar className="ms-1" />
          </span>
        </div>

        {product?.sizes?.length > 0 && (
          <div className="mb-3 d-flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`btn btn-sm rounded-pill p-0 px-2 ${
                  selectedSize === size ? "btn-dark" : "btn-outline-dark"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <button
          className="w-100 mt-auto btn btn-sm btn-warning"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product._id, selectedSize, 1);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
