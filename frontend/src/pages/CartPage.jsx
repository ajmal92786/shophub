import { useNavigate } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { TiShoppingCart } from "react-icons/ti";
import loadingImg from "../assets/loadingImage.gif";
import PriceDetails from "../components/PriceDetails";

function CartPage() {
  const { cart, loading, error } = useCartContext();
  let cartItems = cart?.items || [];

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="py-3 bg-light" style={{ minHeight: "90vh" }}>
        <div className="container">
          {loading && (
            <div className="text-center">
              <img src={loadingImg} alt="Loading Image" className="img-fluid" />
            </div>
          )}
          {!loading && error && (
            <p className="text-center text-danger">
              Something went wrong. Please try again.
            </p>
          )}

          {!loading && !error && (
            <>
              {cartItems.length > 0 ? (
                <>
                  <section className="mb-4">
                    <h5 className="fw-bold text-center">
                      MY CART ({cartItems.length})
                    </h5>
                  </section>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row g-3">
                        {cartItems.map((cartItem) => (
                          <div className="col-12" key={cartItem._id}>
                            <CartItem cartItem={cartItem} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <PriceDetails />
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-3 text-center" style={{ height: "50vh" }}>
                  <TiShoppingCart size={80} className="text-muted" />
                  <p className="text-danger fs-4 fw-bold">
                    Your ShopHub Cart is empty
                  </p>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CartPage;
