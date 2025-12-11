import { useState } from "react";
import AddressItem from "../components/AddressItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAddressContext from "../contexts/AddressContext";
import useCartContext from "../contexts/CartContext";
import { calculateTotalPrice } from "../utils/utils";
import useUserContext from "../contexts/UserContext";
import useToastContext from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { userInfo } = useUserContext();
  const { cart, deliveryCharges } = useCartContext();
  const { addresses } = useAddressContext();
  const { showToast } = useToastContext();

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCheckout = async (selectedAddressId, deliveryCharges) => {
    if (!userInfo?._id) {
      showToast("User not logged in", "warning");
      return;
    }

    if (!selectedAddressId) {
      showToast("Please select an address", "warning");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo?._id,
          addressId: selectedAddressId,
          deliveryCharges,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json.error || json.message || "Error in ordering the products"
        );
      }

      console.log("json: ", json);
      navigate(`/order-success/${json.order._id}`);
    } catch (error) {
      showToast("Something went wrong. Please try again.", "danger");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-light py-5" style={{ minHeight: "85vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h5>Select a delivery address</h5>
              <section>
                <div className="fw-semibold mb-2">
                  All addresses ({addresses?.length})
                </div>
                <div>
                  {addresses.map((address) => (
                    <AddressItem
                      key={address._id}
                      address={address}
                      isSelected={selectedAddressId === address._id}
                      onSelect={() => setSelectedAddressId(address._id)}
                      showDelete={false}
                    />
                  ))}
                </div>
                <div>
                  <button className="w-100 btn btn-outline-primary rounded-0 mb-3">
                    <span className="fs-5">+</span> ADD A NEW ADDRESS
                  </button>
                </div>
              </section>
            </div>

            <div className="col-md-5">
              <div className="bg-white p-3">
                <h6> ORDER SUMMARY </h6>
                <hr />
                {cart?.items?.length && (
                  <div>
                    <div className="fw-semibold d-flex justify-content-between">
                      <span>Product Name</span>
                      <span>Quantity</span>
                    </div>
                    {cart.items.length > 0 ? (
                      cart.items.map((item) => (
                        <div
                          className="d-flex justify-content-between"
                          key={item.productId._id}
                        >
                          <span className="text-muted">
                            {item.productId.title}
                          </span>
                          X {item.quantity}
                        </div>
                      ))
                    ) : (
                      <div>You have nothing in your cart</div>
                    )}
                    <hr />

                    <div className="fw-bold fs-5 d-flex justify-content-between">
                      <span>Total:</span>
                      <span>
                        ₹{calculateTotalPrice(cart.items).totalAmount}
                      </span>
                    </div>
                    <hr />

                    <div className="pb-2 text-success fw-semibold">
                      You will save ₹
                      {calculateTotalPrice(cart.items).totalDiscount} on this
                      order
                    </div>

                    <button
                      className="mt-2 w-100 btn btn-primary"
                      onClick={() =>
                        handleCheckout(selectedAddressId, deliveryCharges)
                      }
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CheckoutPage;
