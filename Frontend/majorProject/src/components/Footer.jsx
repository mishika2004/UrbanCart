import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-accent-bar" />

      <div className="footer-inner">

        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">URBAN<span>CART</span></h2>
            <p className="footer-tagline">Your everyday urban shopping destination</p>
          </div>

          <div className="footer-newsletter">
            <p className="newsletter-label">Stay in the loop</p>
            <strong className="newsletter-heading">Get exclusive deals &amp; new arrivals</strong>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>


        <div className="footer-grid">

        
          <div className="footer-col">
            <h4>About UrbanCart</h4>
            <p>
              UrbanCart is your one-stop online destination for modern lifestyle shopping.
              From fresh home décor and stylish furniture to curated fashion for men, women,
              and kids — we bring quality and convenience right to your door.
            </p>
            <div className="social-row">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">IG</a>
              <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">FB</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Pinterest">PT</a>
              <a href="https://linkedin.com"  target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">LI</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQs &amp; Track Order</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Shop by Category */}
          <div className="footer-col">
            <h4>Shop by Category</h4>
            <ul>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/furniture">Furniture</Link></li>
              <li><Link to="/sale">Sale &amp; Offers</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="contact-item">
              <span className="contact-label">Address</span>
              <span className="contact-val">12 Urban Street, New Delhi, India</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:support@urbancart.in">support@urbancart.in</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Phone</span>
              <a href="tel:+911800123456">+91 1800 123 456</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Hours</span>
              <span className="contact-val">Mon – Sat: 9am – 7pm IST</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 <span>UrbanCart Pvt. Ltd.</span> All rights reserved.</p>
          <div className="bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
          <div className="payment-badges">
            <div className="badge">Visa</div>
            <div className="badge">Mastercard</div>
            <div className="badge">PayPal</div>
            <div className="badge">UPI</div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
