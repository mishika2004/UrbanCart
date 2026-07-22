const ShippingPolicy = () => {
  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-1">Shipping Policy</h2>
      <p className="text-muted mb-4">Last updated: March 2026</p>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-semibold mb-2">🚚 Delivery Timeframes</h5>
        <p className="text-muted">We deliver across India. Estimated delivery times are:</p>
        <ul className="text-muted">
          <li><strong>Metro cities</strong> (Delhi, Mumbai, Bengaluru, Chennai): 2–4 business days</li>
          <li><strong>Tier 2 & 3 cities:</strong> 4–7 business days</li>
          <li><strong>Remote & rural areas:</strong> 7–10 business days</li>
        </ul>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-semibold mb-2">💰 Shipping Charges</h5>
        <ul className="text-muted">
          <li>Orders above <strong>₹499</strong> — <span className="text-success fw-semibold">FREE Delivery</span></li>
          <li>Orders below ₹499 — Flat ₹49 delivery charge</li>
          <li>Furniture & large items — Additional ₹199 handling fee may apply</li>
        </ul>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-semibold mb-2">📦 Order Tracking</h5>
        <p className="text-muted">
          Once your order is dispatched, you'll receive an SMS and email with your tracking number.
          You can track your package using the tracking ID on our logistics partner's website.
          Orders are typically dispatched within <strong>24 hours</strong> of placement.
        </p>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-semibold mb-2">⚠️ Delayed or Lost Shipments</h5>
        <p className="text-muted">
          If your order hasn't arrived within the expected timeframe, please contact us at{" "}
          <a href="mailto:support@urbancart.in">support@urbancart.in</a> or call{" "}
          <a href="tel:+911800123456">+91 1800 123 456</a>. We'll investigate and resolve
          the issue within 3 business days.
        </p>
      </div>

      <div className="card shadow-sm p-4">
        <h5 className="fw-semibold mb-2">🏠 Delivery Attempts</h5>
        <p className="text-muted">
          Our courier partner will attempt delivery up to <strong>3 times</strong>. If all attempts
          fail, the package will be returned to our warehouse and a refund will be initiated
          within 5–7 business days.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;