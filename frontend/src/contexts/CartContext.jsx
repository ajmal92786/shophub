import { createContext, useContext, useState, useEffect } from "react";
import useUserContext from "../contexts/UserContext";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);
export default useCartContext;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useUserContext();
  const deliveryCharges = 499;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function fetchCart() {
    if (!userInfo?._id) {
      setCart([]);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/cart?userId=${userInfo?._id}`);

      if (!res.ok) {
        throw new Error(`Failed fetching cart: ${res.statusText}`);
      }

      const json = await res.json();

      setCart(json?.cart || []);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(productId, size, quantity) {
    if (!userInfo?._id)
      return { success: false, message: "User not logged in" };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userInfo._id,
          productId,
          size,
          quantity,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: json?.message || "Failed to add to cart",
        };
      }

      setCart(json.cart);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart(productId, size) {
    if (!userInfo?._id)
      return { success: false, message: "User not logged in" };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo._id, size }),
      });

      const json = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: json?.message || "Failed to remove from cart",
        };
      }

      setCart(json.cart);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantityInCart(productId, size, quantity) {
    if (!userInfo?._id) {
      return { success: false, message: "User not logged in" };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/cart/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo._id,
          size,
          quantity,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: json?.message || "Failed to update quantity",
        };
      }

      setCart(json.cart);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [userInfo?._id]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        deliveryCharges,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
