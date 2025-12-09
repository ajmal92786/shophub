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
  {
    path: "/products/details/:productId",
    element: <ProductDetailsPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/wishlist",
    element: <WishlistPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  { path: "/profile", element: <ProfilePage /> },
]);

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <CategoryProvider>
              <RouterProvider router={router} />
            </CategoryProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </UserProvider>
  );
}

export default App;
