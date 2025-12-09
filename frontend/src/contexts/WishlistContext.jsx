import { createContext, useContext, useEffect, useState } from "react";
import useUserContext from "./UserContext";

const WishlistContext = createContext();

const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { userInfo } = useUserContext();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function fetchWishlist() {
    if (!userInfo?._id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${BASE_URL}/api/wishlist?userId=${userInfo._id}`
      );
      const json = await res.json();

      if (!res.ok) {
        setError(json?.message || "Failed to fetch wishlist");
        return;
      }

      setWishlistIds(json.wishlist.items.map((item) => item.product._id));
      setWishlist(json.wishlist);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function addToWishlist(productId) {
    if (!userInfo?._id)
      return { success: false, message: "User not logged in" };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo._id, productId }),
      });

      const json = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: json?.error || "Failed to add to wishlist",
        };
      }

      setWishlistIds(json.wishlist.items.map((item) => item.product._id));
      setWishlist(json.wishlist);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    if (!userInfo?._id) {
      return { success: false, message: "User not logged in" };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo._id,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: json.message || "Failed to delete from wishlist",
        };
      }

      setWishlistIds(json.wishlist.items.map((item) => item.product._id));
      setWishlist(json.wishlist);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, [userInfo?._id]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        wishlistIds,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
