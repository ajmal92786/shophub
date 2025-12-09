import Footer from "../components/Footer";
import Header from "../components/Header";
import useWishlistContext from "../contexts/WishlistContext";
import loadingImg from "../assets/loadingImage.gif";
import WishlistItem from "../components/WishlistItem";
import { TbShoppingBagHeart } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function WishlistPage() {
  const { wishlist, loading, error } = useWishlistContext();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="py-3 bg-light" style={{ minHeight: "85vh" }}>
        <div className="container">
          {loading && (
            <div className="text-center">
              <img src={loadingImg} alt="Laoding gif" />
            </div>
          )}

          {!loading && error && (
            <p className="text-danger text-center">Something went wrong!</p>
          )}

          {!loading && !error && (
            <>
              {wishlist && wishlist.items.length > 0 ? (
                <>
                  <section className="mb-5">
                    <h4 className="fw-bold text-center">My Wishlist</h4>
                  </section>
                  <div className="row g-4">
                    {wishlist.items.map((item) => (
                      <div
                        key={item._id}
                        className="col-md-3"
                        style={{ height: "440px" }}
                      >
                        <WishlistItem item={item} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-warning mt-5 mb-3">
                    <TbShoppingBagHeart size={48} />
                  </div>
                  <h3 className="text-warning">Your wishlist is empty!</h3>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/")}
                  >
                    Add items to wishlist
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

export default WishlistPage;
