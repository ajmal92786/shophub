import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCheckCircle } from "react-icons/fa";
import useUserContext from "../contexts/UserContext";
import { useEffect, useState } from "react";
import AddressItem from "../components/AddressItem";
import useCartContext from "../contexts/CartContext";

function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const { userInfo } = useUserContext();
  const { deliveryCharges } = useCartContext();

  const navigate = useNavigate();
  const { orderId } = useParams();

  console.log("orderDetails: ", orderDetails);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const calculateTotalAmountBeforeDiscount = (items) => {
    const totalAmountBeforeDiscount = items.reduce(
      (sum, curr) => sum + curr.product.price,
      0
    );

    return totalAmountBeforeDiscount;
  };

  const fetchOrderDetails = async () => {
    if (!userInfo?._id) {
      return;
    }

    if (!orderId) {
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/orders/${orderId}?userId=${userInfo._id}`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json.message || json.error || "Erorr in fetching order"
        );
      }

      setOrderDetails(json?.data.order);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [userInfo?._id]);

  return (
    <>
      <Header />
      <main className="bg-light py-4" style={{ minHeight: "85vh" }}>
        {orderDetails ? (
          <div className="container py-3 col-12 col-md-6 bg-white">
            <section className="text-center">
              <div className="py-3 text-success">
                <FaCheckCircle size={50} />
              </div>
              <h4>Your order has been placed!</h4>
            </section>

            <section>
              <h6 className="my-2 fw-semibold">Delivery Address</h6>
              <div>
                <AddressItem address={orderDetails.shippingAddress} />
              </div>
            </section>

            <section>
              <h6>Order Summary</h6>

              {orderDetails.items.map((item) => (
                <div className="card mb-3" key={item._id}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <div style={{ height: "150px" }}>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-100 h-100 img-fluid object-fit-cover"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="card-title fw-semibold">
                          {item.product.title}
                        </div>
                        <div className="card-text">X{item.quantity}</div>
                        <div className="card-text fw-semibold">
                          ₹{Math.floor(item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-12"></div>
            </section>

            <section className="py-3">
              <h6>Payment Summary</h6>
              <div className="d-flex justify-content-between">
                <span>Item Total</span>
                <span>
                  ₹{Math.floor(orderDetails.totalAmount) - deliveryCharges}
                </span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Discount</span>
                <span>
                  ₹
                  {Math.floor(
                    calculateTotalAmountBeforeDiscount(orderDetails.items) -
                      orderDetails.totalAmount +
                      deliveryCharges
                  )}
                </span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>

              <div className="fw-semibold fs-5 d-flex justify-content-between">
                <span>Total</span>
                <span>₹{Math.floor(orderDetails.totalAmount)}</span>
              </div>
            </section>

            <div className="fs-5 fw-semibold text-center">
              Your order will arrive soon
            </div>

            <div className="mt-5">
              <button
                className="w-100 btn btn-primary"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div>Order not found</div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default OrderSuccessPage;
