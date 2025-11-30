// function Footer() {
//   return (
//     <footer>
//       <div className="container">Footer</div>
//     </footer>
//   );
// }

// export default Footer;

import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaInstagramSquare,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* ----- Brand & About ----- */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">ShopHub</h5>
            <p className="small text-secondary">
              Your trusted destination for quality products. Shop smart, shop
              fast, shop with confidence.
            </p>
          </div>

          {/* ----- Quick Links ----- */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-light text-decoration-none"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-light text-decoration-none">
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="text-light text-decoration-none"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* ----- Customer Support ----- */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Customer Support</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ----- Contact & Socials ----- */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <p className="small text-secondary mb-1">support@shophub.com</p>
            <p className="small text-secondary mb-3">+91 0123456789</p>

            <div className="d-flex gap-3">
              <Link
                to="https://github.com/ajmal92786"
                className="text-light fs-5"
              >
                <FaGithub size={24} />
              </Link>
              <Link to="/" className="text-light fs-5">
                <FaFacebook size={24} />
              </Link>
              <Link to="https://x.com/Ajmal92786" className="text-light fs-5">
                <FaTwitter size={24} />
              </Link>
              <Link to="/" className="text-light fs-5">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 border-top pt-3 text-secondary small">
          © {new Date().getFullYear()} ShopHub · Made with ❤️ by Mohd Ajmal Raza
        </div>
      </div>
    </footer>
  );
}

export default Footer;
