

import { createContext, useState, useEffect, useContext } from "react";
import { apiUrl } from "../config/api";

export const CartContext = createContext();

const USER_ID = "64ba8b6f3a5bf2d4c0f86254"; 

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const res  = await fetch(apiUrl(`/api/cart/${USER_ID}`));
      const data = await res.json();
      setCartItems(data?.data?.cart?.products || []);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const addToCart = async (productId) => {
    setCartLoading(true);
    try {
      const res  = await fetch(apiUrl("/api/cart/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, productId }),
      });
      const data = await res.json();
      setCartItems(data?.data?.cart?.products || []);
    } catch (err) {
      console.error("Add to cart error", err);
    }
    setCartLoading(false);
  };

  const removeFromCart = async (productId) => {
    try {
      const res  = await fetch(apiUrl("/api/cart/remove"), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, productId }),
      });
      const data = await res.json();
      setCartItems(data?.data?.cart?.products || []);
    } catch (err) {
      console.error("Remove from cart error", err);
    }
  };

  const increaseQty = async (productId) => {
    try {
      const res  = await fetch(apiUrl("/api/cart/increase"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, productId }),
      });
      const data = await res.json();
      setCartItems(data?.data?.cart?.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      const res  = await fetch(apiUrl("/api/cart/decrease"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, productId }),
      });
      const data = await res.json();
      setCartItems(data?.data?.cart?.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(apiUrl(`/api/cart/clear/${USER_ID}`), { method: "DELETE" });
      setCartItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount    = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal    = cartItems.reduce((acc, item) => acc + (item.productId?.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, cartLoading, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, fetchCart, USER_ID }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
