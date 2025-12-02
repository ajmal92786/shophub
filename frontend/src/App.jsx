import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { CategoryProvider } from "./contexts/CategoryContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products/:category", element: <ProductsPage /> },
]);

function App() {
  return (
    <CategoryProvider>
      <RouterProvider router={router} />
    </CategoryProvider>
  );
}

export default App;
