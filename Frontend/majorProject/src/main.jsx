

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import CartProvider from "./context/CartContext";

// import './index.css';
// import App from './App';
// import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Home from './pages/Home';
// import Men from "./pages/Men";
// import Women from "./pages/Women";
// import Kids from "./pages/Kids";
// import Furniture from "./pages/Furniture";
// import HomeCategory from "./pages/HomeCategory";
// import Electronics from "./pages/Electronics";
// import ProductDetails from './pages/ProductDetails';
// import Wishlist from "./pages/Wishlist";
// import RefundPolicy   from "./pages/RefundPolicy";
// import ShippingPolicy from "./pages/ShippingPolicy";
// import PrivacyPolicy  from "./pages/PrivacyPolicy";
// import TermsOfService from "./pages/TermsOfService";
// import FAQ            from "./pages/FAQ";
// import Blog           from "./pages/Blog";


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { index: true, element: <Home /> },      // default route
//       { path: "products", element: <Products /> },
//       { path: "cart", element: <Cart /> },
//       { path: "men", element: <Men /> },
//       { path: "product/:id", element: <ProductDetails /> },
//       { path: "women", element: <Women /> },
//       { path: "kids", element: <Kids /> },
//       { path: "furniture", element: <Furniture /> },
//       { path: "home", element: <HomeCategory /> },
//       { path: "electronics", element: <Electronics /> },
//       { path: "wishlist", element: <Wishlist /> },
//       { path: "refund-policy", element: <RefundPolicy /> },
//       { path: "shipping-policy", element: <ShippingPolicy /> },
//       { path: "privacy-policy", element: <PrivacyPolicy /> },
//       { path: "terms-of-service", element: <TermsOfService /> },
//       { path: "faq", element: <FAQ /> },
//       { path: "blog", element: <Blog /> }
//     ]
//   }
// ]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <CartProvider>
//       <RouterProvider router={router} />
//     </CartProvider>
//   </StrictMode>
// );



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CartProvider     from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

import "./index.css";
import App            from "./App";
import Home           from "./pages/Home";
import Products       from "./pages/Products";
import Cart           from "./pages/Cart";
import Men            from "./pages/Men";
import Women          from "./pages/Women";
import Kids           from "./pages/Kids";
import Furniture      from "./pages/Furniture";
import HomeCategory   from "./pages/HomeCategory";
import Electronics    from "./pages/Electronics";
import ProductDetails from "./pages/ProductDetails";
import Wishlist       from "./pages/Wishlist";
import AddressManager from "./pages/AddressManager";
import Checkout       from "./pages/Checkout";
import UserProfile    from "./pages/UserProfile";
import OrderHistory   from "./pages/OrderHistory";
import RefundPolicy   from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy  from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQ            from "./pages/FAQ";
import Blog           from "./pages/Blog";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,             element: <Home /> },
      { path: "products",        element: <Products /> },
      { path: "cart",            element: <Cart /> },
      { path: "men",             element: <Men /> },
      { path: "women",           element: <Women /> },
      { path: "kids",            element: <Kids /> },
      { path: "furniture",       element: <Furniture /> },
      { path: "home",            element: <HomeCategory /> },
      { path: "electronics",     element: <Electronics /> },
      { path: "product/:id",     element: <ProductDetails /> },
      { path: "wishlist",        element: <Wishlist /> },
      { path: "addresses",       element: <AddressManager /> },
      { path: "checkout",        element: <Checkout /> },
      { path: "profile",         element: <UserProfile /> },
      { path: "orders",          element: <OrderHistory /> },
      { path: "refund-policy",   element: <RefundPolicy /> },
      { path: "shipping-policy", element: <ShippingPolicy /> },
      { path: "privacy-policy",  element: <PrivacyPolicy /> },
      { path: "terms-of-service",element: <TermsOfService /> },
      { path: "faq",             element: <FAQ /> },
      { path: "blog",            element: <Blog /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
);
