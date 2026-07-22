import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext }     from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Toast = ({ message, type }) =>
  message ? (
    <div
      className={`alert alert-${type} py-1 px-3 mb-0`}
      style={{ fontSize: "0.82rem", position: "fixed", bottom: 24, right: 24, zIndex: 9999, minWidth: 220 }}
    >
      {message}
    </div>
  ) : null;

let toastTimer = null;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems }         = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast({ message: "", type: "success" }), 2000);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setLoading(true);
    await addToCart(product._id);
    setLoading(false);
    showToast("✅ Added to cart!");
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
      showToast("💔 Removed from wishlist", "warning");
    } else {
      await addToWishlist(product._id);
      showToast("❤️ Added to wishlist!");
    }
  };

  const wishlisted = isInWishlist(product._id);

  return (
    <>
      <div
        className="card h-100 shadow-sm"
        style={{ cursor: "pointer", transition: "transform 0.15s" }}
        onClick={() => navigate(`/product/${product._id}`)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <div style={{ position: "relative" }}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: "210px", objectFit: "cover" }}
          />
          <button
            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${wishlisted ? "btn-danger" : "btn-outline-danger"}`}
            style={{ borderRadius: "50%", width: 34, height: 34, padding: 0 }}
            onClick={handleWishlist}
          >
            <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
          </button>
        </div>

        <div className="card-body d-flex flex-column">
          <h6 className="card-title mb-1" style={{ fontSize: "0.9rem" }}>{product.name}</h6>
          <p className="text-muted small mb-1">{product.category}</p>
          <div className="d-flex align-items-center mb-2">
            <span className="fw-bold me-2">₹{product.price}</span>
            <span className="text-warning small">{"★".repeat(Math.round(product.rating))} <span className="text-muted">({product.rating})</span></span>
          </div>
          <button
            className="btn btn-primary btn-sm mt-auto w-100"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading
              ? <span className="spinner-border spinner-border-sm" role="status" />
              : <><i className="bi bi-cart-plus me-1" />Add to Cart</>
            }
          </button>
        </div>
      </div>
      <Toast {...toast} />
    </>
  );
};

export default ProductCard;
