import { useNavigate } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import { calculatePriceAfterDiscount } from "../utils/utils";

function PriceDetails() {
  const { cart } = useCartContext();
  const deliveryCharges = 499;

  const navigate = useNavigate();

  const calculateTotalPrice = (items) => {
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

  const handlePlaceOrder = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white p-3 mt-5 rounded">
      <h6 className="fw-bold">PRICE DETAILS</h6>
      <hr />

      <section>
        <div className="d-flex justify-content-between">
          <span>Price ({cart.items.length} items)</span>
          <span className="fw-semibold">
            ₹{calculateTotalPrice(cart.items).totalPriceAfterDiscount}
          </span>
        </div>
        <div className="py-2 d-flex justify-content-between">
          <span>Discount</span>
          <span className="fw-bold">
            -₹{calculateTotalPrice(cart.items).totalDiscount}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Delivery Charges</span>
          <span className="fw-semibold">₹{deliveryCharges}</span>
        </div>
      </section>
      <hr />

      <section>
        <div className="d-flex justify-content-between fw-bold">
          <span>Total Amount</span>
          <span>₹{calculateTotalPrice(cart.items).totalAmount}</span>
        </div>
      </section>
      <hr />

      <section className="d-flex flex-column">
        <div className="pb-2 text-success fw-semibold">
          You will save ₹{calculateTotalPrice(cart.items).totalDiscount} on this
          order
        </div>
        <button className="btn btn-sm btn-primary" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </section>
    </div>
  );
}

export default PriceDetails;
