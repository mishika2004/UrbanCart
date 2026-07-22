import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const USER_ID = "user_urbancart_001";

const OrderHistory = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl(`/api/orders/${USER_ID}`))
      .then((r) => r.json())
      .then((d) => { setOrders(d?.data?.orders || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" /></div>;

  if (orders.length === 0) return (
    <div className="container mt-5 text-center">
      <i className="bi bi-bag-x" style={{ fontSize: "5rem", color: "#ccc" }} />
      <h4 className="mt-3 text-muted">No orders yet</h4>
    </div>
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📦 Order History</h3>
      {orders.map((order) => (
        <div className="card shadow-sm mb-4 p-4" key={order._id}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 className="mb-0">Order ID: <span className="text-muted">{order._id}</span></h6>
              <small className="text-muted">{new Date(order.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}</small>
            </div>
            <span className="badge bg-success">{order.status}</span>
          </div>

          {order.products.map((item) => {
            const p = item.productId;
            return p ? (
              <div key={item._id} className="d-flex align-items-center gap-3 mb-2">
                <img src={p.image} alt={p.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6 }} />
                <div className="flex-grow-1">
                  <h6 className="mb-0 small">{p.name}</h6>
                  <small className="text-muted">Qty: {item.quantity} × ₹{item.price}</small>
                </div>
                <span className="fw-semibold small">₹{item.quantity * item.price}</span>
              </div>
            ) : null;
          })}

          <hr />
          <div className="d-flex justify-content-between">
            <span className="text-muted small">Delivered to: {order.address?.city}, {order.address?.state}</span>
            <span className="fw-bold">Total: ₹{order.totalAmount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
