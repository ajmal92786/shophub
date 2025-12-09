import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IoMdHeart } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { TbTruckReturn } from "react-icons/tb";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import useCartContext from "../contexts/CartContext";
import useToastContext from "../contexts/ToastContext";
import { calculatePriceAfterDiscount } from "../utils/utils";
import useWishlistContext from "../contexts/WishlistContext";
import loadingImg from "../assets/loadingImage.gif";

function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartContext();
  const { showToast } = useToastContext();
  const { wishlistIds, addToWishlist, removeFromWishlist } =
    useWishlistContext();
  const { productId } = useParams();

  const { data, loading, error } = useFetch(`/api/products/${productId}`);
  const product = data?.data?.product;

  const handleAddToWishlist = async (productId) => {
    if (wishlistIds.includes(productId)) {
      const result = await removeFromWishlist(productId);

      if (result.success) {
        showToast("Item removed from wishlist!", "warning");
      } else {
        showToast(
          result.message || "Error in removing from wishlist!",
          "warning"
        );
      }
    } else {
      const result = await addToWishlist(productId);

      if (result.success) {
        showToast("Item added to wishlist!", "success");
      } else {
        showToast(result.message || "Error in add to wishlist!", "warning");
      }
    }
  };

  const handleAddToCart = async (productId, selectedSize, quantity) => {
    if (
      !selectedSize &&
      !["Books", "Electronics"].includes(product.category.name)
    ) {
      showToast("Please choose a size", "warning");
      return;
    }

    const result = await addToCart(productId, selectedSize, quantity);

    if (result.success) {
      showToast("Item added to cart!", "success");
    } else {
      showToast(result.message || "Failed to add to cart", "warning");
    }
  };

  return (
    <>
      <Header />
      <main className="container py-4">
        {loading && (
          <div className="text-center" style={{ minHeight: "80vh" }}>
            <img src={loadingImg} alt="Loading Image" className="img-fluid" />
          </div>
        )}
        {error && (
          <p className="py-3 text-center text-danger">Something went wrong!</p>
        )}

        {product && (
          <div className="row g-5">
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column">
                <div className="position-relative" style={{ height: "72vh" }}>
                  <div className="p-2 position-absolute end-0">
                    <button
                      className={`p-2 bg-light border-0 rounded-circle ${
                        wishlistIds.includes(productId)
                          ? "text-danger"
                          : "text-secondary"
                      }`}
                      onClick={() => handleAddToWishlist(product._id)}
                    >
                      <IoMdHeart size={27} />
                    </button>
                  </div>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <button className="my-2 btn btn-warning">Buy Now</button>
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    handleAddToCart(product._id, selectedSize, quantity)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <div>
                <section>
                  <h1 className="fs-4 fw-semibold">{product.title}</h1>
                </section>

                <div className="d-flex align-items-center">
                  <span aria-label={`Rating ${product.rating} stars`}>
                    {product.rating}
                  </span>
                  <IoMdStar size={20} className="ms-1 text-warning" />
                </div>

                <section className="py-3">
                  <div className="fw-bold fs-5">
                    ₹
                    {calculatePriceAfterDiscount(
                      product.price,
                      product.discountPercentage
                    )}
                    <span className="fw-bold fs-6 text-muted ms-2 text-decoration-line-through">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="text-muted fw-semibold">
                    {product.discountPercentage}% off
                  </div>
                </section>

                <section className="d-flex align-items-center">
                  <label className="fw-bold me-2">Quantity:</label>

                  <div className="input-group" style={{ width: "130px" }}>
                    <button
                      className="btn btn-outline-secondary"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                      disabled={quantity === 1}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      readOnly
                      className="fw-bold form-control text-center"
                      aria-label="Selected quantity"
                    />

                    <button
                      className="btn btn-outline-secondary"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </section>

                {product?.sizes?.length > 0 && (
                  <div className="mt-3 mb-4 d-flex flex-wrap gap-2">
                    <span className="fw-bold">Size:</span>
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`btn btn-sm p-0 px-2 ${
                          selectedSize === size
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <hr />

              <section aria-label="Product features" className="d-flex gap-4">
                {product?.returnPolicy?.returnable && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <TbTruckReturn size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>{product?.returnPolicy?.returnDays} days</span>
                      <span>Returnable</span>
                    </div>
                  </div>
                )}
                {product?.payOnDelivery && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <TbCoinRupeeFilled size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>Pay on</span>
                      <span>Delivery</span>
                    </div>
                  </div>
                )}
                {product?.freeDelivery && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <TbTruckDelivery size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>Free</span>
                      <span>Delivery</span>
                    </div>
                  </div>
                )}
                {product?.securePayment && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <RiSecurePaymentLine size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>Secure</span>
                      <span>Payment</span>
                    </div>
                  </div>
                )}
              </section>

              <hr />

              <section>
                <div className="fw-bold">Description:</div>
                {product?.descriptionPoints?.length > 0 && (
                  <ul>
                    {product.descriptionPoints.map((descPoint, index) => (
                      <li key={index}>{descPoint}</li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
