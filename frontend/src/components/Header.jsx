import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishlistContext";
import useFilterContext from "../contexts/FilterContext";

function Header() {
  const { searchQuery, setSearchQuery } = useFilterContext();
  const { cart } = useCartContext();
  const { wishlist } = useWishlistContext();

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/all?search=${searchQuery}`);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-danger">
            ShopHub
          </Link>

          {/* MOBILE: ICONS + TOGGLER (Right Side) */}
          <div className="d-flex d-lg-none align-items-center gap-3">
            <Link to="/profile" className="nav-link">
              <FaUser size={24} />
            </Link>

            <Link to="/wishlist" className="nav-link p-0 position-relative">
              <FaHeart size={24} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {wishlist?.items.length > 0 ? wishlist.items.length : null}
              </span>
            </Link>

            <Link to="/cart" className="nav-link p-0 position-relative">
              <FaShoppingCart size={24} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {cart?.items?.length}
              </span>
            </Link>

            {/* Toggle Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* NAV CONTENT (Desktop & Dropdown) */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <form
              className="d-flex mx-auto mt-3 mt-lg-0 w-100"
              style={{ maxWidth: "500px" }}
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                className="form-control rounded-start shadow-none"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row gap-3 align-items-center">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FaUser size={24} />
                </Link>
              </li>

              <li className="nav-item position-relative">
                <Link to="/wishlist" className="nav-link">
                  <FaHeart size={24} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {wishlist?.items.length > 0 ? wishlist.items.length : null}
                  </span>
                </Link>
              </li>

              <li className="nav-item position-relative">
                <Link to="/cart" className="nav-link">
                  <FaShoppingCart size={24} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart?.items?.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
