import { createContext, useState, useEffect } from "react";
import { apiUrl } from "../config/api";

export const WishlistContext = createContext();

const USER_ID = "64ba8b6f3a5bf2d4c0f86254";

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res  = await fetch(apiUrl(`/api/wishlist/${USER_ID}`));
      const data = await res.json();
      setWishlist(data?.data?.wishlist?.products || []);
    } catch (err) {
      console.error("Wishlist fetch error", err);
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  const addToWishlist = async (productId) => {
    try {
      const res  = await fetch(apiUrl("/api/wishlist/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, productId }),
      });
      const data = await res.json();
      setWishlist(data?.data?.wishlist?.products || []);
    } catch (err) {
      console.error("Add to wishlist error", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res  = await fetch(apiUrl("/api/wishlist/remove"), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, productId }),
      });
      const data = await res.json();
      setWishlist(data?.data?.wishlist?.products || []);
    } catch (err) {
      console.error("Remove from wishlist error", err);
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some((p) => p._id?.toString() === productId?.toString());

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist, USER_ID }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
