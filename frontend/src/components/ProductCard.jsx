import { IoMdStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="card mb-3 position-relative">
      <button className="m-1 bg-transparent border-0 text-white position-absolute top-0 end-0">
        <FaRegHeart size={22} />
      </button>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="card-img-top object-fit-cover"
        style={{ height: "250px" }}
      />

      <div className="card-body">
        <h5 className="card-title text-truncate">{product.title}</h5>
        <div className="mb-3 card-text d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{product.price}</span>
          <span
            className="px-2 bg-success-subtle text-success-emphasis d-flex align-items-center border rounded-pill"
            aria-label={`Rating ${product.rating} stars`}
          >
            {product.rating} <IoMdStar className="ms-1" />
          </span>
        </div>
        <button type="button" className="w-100 btn btn-warning">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
