import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext }     from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, cartTotal } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleMoveToWishlist = async (item) => {
    await addToWishlist(item.productId._id);
    await removeFromCart(item.productId._id);
    alert("Moved to Wishlist!");
  };

  const deliveryCharge = cartItems.length > 0 ? 49 : 0;
  const totalPayable   = cartTotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <i className="bi bi-cart-x" style={{ fontSize: "5rem", color: "#ccc" }} />
        <h4 className="mt-3 text-muted">Your cart is empty</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🛒 Your Cart ({cartItems.length} items)</h3>
      <div className="row g-4">

        {/* Cart Items */}
        <div className="col-lg-8">
          {cartItems.map((item) => {
            const p = item.productId;
            if (!p) return null;
            return (
              <div className="card mb-3 shadow-sm" key={p._id}>
                <div className="row g-0 align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src={p.image} alt={p.name}
                      style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px 0 0 8px" }}
                    />
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="card-body py-2">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-0">{p.name}</h6>
                          <small className="text-muted text-capitalize">{p.category}</small>
                        </div>
                        <span className="fw-bold text-primary">₹{p.price * item.quantity}</span>
                      </div>

                      <p className="mb-1 mt-1 small text-muted">₹{p.price} × {item.quantity}</p>

                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <button className="btn btn-outline-secondary btn-sm px-2 py-0"
                          onClick={() => decreaseQty(p._id)}>−</button>
                        <span className="fw-semibold">{item.quantity}</span>
                        <button className="btn btn-outline-secondary btn-sm px-2 py-0"
                          onClick={() => increaseQty(p._id)}>+</button>

                        <button className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => { removeFromCart(p._id); alert("Removed from cart"); }}>
                          <i className="bi bi-trash" /> Remove
                        </button>

                        <button className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleMoveToWishlist(item)}>
                          <i className="bi bi-heart" /> Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-3 sticky-top" style={{ top: "80px" }}>
            <h5 className="mb-3">Price Details</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <span className="text-success">{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total Payable</span>
              <span>₹{totalPayable}</span>
            </div>
            <button
              className="btn btn-success w-100"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
