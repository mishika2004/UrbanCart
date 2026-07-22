import { Link } from "react-router-dom";
import "./PageLayout.css";

const RefundPolicy = () => {
  return (
    <div className="page-wrapper">

      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="page-breadcrumb">
            <Link to="/">Home</Link><span>/</span>Refund Policy
          </p>
          <h1 className="page-title">Refund <span>Policy</span></h1>
          <p className="page-meta">Last updated: January 2026</p>
        </div>
      </div>

      <div className="page-content">

        <div className="page-section">
          <h2 className="section-title"><span className="section-number">01</span>Overview</h2>
          <p>
            At UrbanCart, we want you to love every purchase. If something isn't right,
            we're here to make it easy. Our refund policy covers all product categories —
            Women, Men, Kids, Home, and Furniture — with clear timelines and simple steps.
          </p>
          <div className="info-box">
            <strong>Quick Summary:</strong> Most items are eligible for a full refund within
            7 days of delivery, provided they are unused and in original packaging.
          </div>
        </div>

        <div className="page-section">
          <h2 className="section-title"><span className="section-number">02</span>Eligibility for Refunds</h2>
          <p>To be eligible for a refund, your item must meet the following conditions:</p>
          <ul>
            <li>Item returned within 7 days of delivery date</li>
            <li>Item is unused, unworn, and unwashed</li>
            <li>Original tags and packaging must be intact</li>
            <li>Proof of purchase (order ID or receipt) is required</li>
            <li>Item must not be from the non-returnable categories listed below</li>
          </ul>
        </div>

        <div className="page-section">
          <h2 className="section-title"><span className="section-number">03</span>Non-Returnable Items</h2>
          <p>The following items cannot be returned or refunded:</p>
          <ul>
            <li>Innerwear, lingerie, and swimwear (hygiene reasons)</li>
            <li>Customised or personalised furniture orders</li>
            <li>Items purchased during final sale / clearance events</li>
            <li>Gift cards and vouchers</li>
            <li>Items damaged due to misuse or improper care</li>
          </ul>
        </div>

        <div className="page-section">
          <h2 className="section-title"><span className="section-number">04</span>Refund Process</h2>
          <p>Once we receive your returned item and inspect it, we will notify you via email. If approved:</p>
          <ul>
            <li>Refund is processed within <strong>5–7 business days</strong></li>
            <li>Amount is credited to the original payment method</li>
            <li>UPI / wallet refunds may reflect within 24 hours</li>
            <li>Bank / card refunds may take 7–10 business days depending on your bank</li>
          </ul>
        </div>

        <div className="page-section">
          <h2 className="section-title"><span className="section-number">05</span>Damaged or Wrong Item?</h2>
          <p>
            If you received a damaged, defective, or incorrect item, please contact us
            within <strong>48 hours</strong> of delivery with photos. We will arrange a free
            reverse pickup and send a replacement or issue a full refund — your choice.
          </p>
        </div>

        <div className="contact-cta">
          <h3>Need help with a refund?</h3>
          <p>Our support team is available Mon–Sat, 9am–7pm IST</p>
          <a href="mailto:support@urbancart.in" className="cta-btn">Contact Support</a>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
