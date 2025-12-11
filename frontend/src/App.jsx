import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FilterProvider } from "./contexts/FilterContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";
import WishlistPage from "./pages/WishlistPage";
import { WishlistProvider } from "./contexts/WishlistContext";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import { AddressProvider } from "./contexts/AddressContext";
import OrderSuccessPage from "./pages/OrderSuccessPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/products/:category",
    element: (
      <FilterProvider>
        <ProductsPage />
      </FilterProvider>
    ),
  },
  { path: "/products/details/:productId", element: <ProductDetailsPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/wishlist", element: <WishlistPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/order-success/:orderId", element: <OrderSuccessPage /> },
]);

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <CategoryProvider>
              <AddressProvider>
                <RouterProvider router={router} />
              </AddressProvider>
            </CategoryProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </UserProvider>
  );
}

export default App;
