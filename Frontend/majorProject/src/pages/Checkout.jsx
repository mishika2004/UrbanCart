import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { apiUrl } from "../config/api";

const USER_ID = "user_urbancart_001";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [addresses,       setAddresses]       = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placing,         setPlacing]         = useState(false);
  const [success,         setSuccess]         = useState(false);
  const navigate = useNavigate();

  const deliveryCharge = cartItems.length > 0 ? 49 : 0;

  useEffect(() => {
    fetch(apiUrl(`/api/addresses/${USER_ID}`))
      .then((r) => r.json())
      .then((d) => { const addrs = d?.data?.addresses || []; setAddresses(addrs); if (addrs.length > 0) setSelectedAddress(addrs[0]); });
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Please select a delivery address.");
    if (cartItems.length === 0) return alert("Cart is empty.");

    setPlacing(true);
    try {
      const orderProducts = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity:  item.quantity,
        price:     item.productId.price,
      }));

      const res = await fetch(apiUrl("/api/orders/place"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          products: orderProducts,
          address: selectedAddress,
          totalAmount: cartTotal + deliveryCharge,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        await clearCart();
        setSuccess(true);
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      alert("Error placing order");
    }
    setPlacing(false);
  };

  if (success) {
    return (
      <div className="container mt-5 text-center">
        <div style={{ fontSize: "5rem" }}>🎉</div>
        <h2 className="text-success mt-2">Order Placed Successfully!</h2>
        <p className="text-muted">Your items will be delivered to {selectedAddress?.city}.</p>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/orders")}>View Orders</button>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/products")}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Checkout</h3>
      <div className="row g-4">

        {/* Address Selection */}
        <div className="col-lg-7">
          <div className="card shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-between mb-3">
              <h5>Delivery Address</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigate("/addresses")}>
                + Add / Manage
              </button>
            </div>

            {addresses.length === 0 ? (
              <p className="text-muted">No addresses found. <span className="text-primary" style={{ cursor:"pointer" }} onClick={() => navigate("/addresses")}>Add one</span></p>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`card p-3 mb-2 ${selectedAddress?._id === addr._id ? "border-primary border-2" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAddress(addr)}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="mb-0">{addr.name}</h6>
                      <small className="text-muted">{addr.street}, {addr.city}, {addr.state} – {addr.pincode}</small><br />
                      <small className="text-muted">📞 {addr.phone}</small>
                    </div>
                    {selectedAddress?._id === addr._id && (
                      <span className="text-primary fw-bold">✓ Selected</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Items */}
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Order Summary ({cartItems.length} items)</h5>
            {cartItems.map((item) => {
              const p = item.productId;
              return p ? (
                <div key={p._id} className="d-flex align-items-center mb-3 gap-3">
                  <img src={p.image} alt={p.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }} />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 small">{p.name}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <span className="fw-semibold">₹{p.price * item.quantity}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Price Card */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-4 sticky-top" style={{ top: "80px" }}>
            <h5 className="mb-3">Price Details</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span><span>₹{cartTotal}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery</span><span className="text-success">₹{deliveryCharge}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
              <span>Total</span><span>₹{cartTotal + deliveryCharge}</span>
            </div>
            <button className="btn btn-success w-100 btn-lg" onClick={handlePlaceOrder} disabled={placing || !selectedAddress}>
              {placing ? <span className="spinner-border spinner-border-sm" /> : "Place Order 🎉"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
