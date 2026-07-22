import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext }     from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { apiUrl } from "../config/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart }                              = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding,  setAdding]  = useState(false);

  useEffect(() => {
    fetch(apiUrl(`/api/products/${id}`))
      .then((r) => r.json())
      .then((d) => { setProduct(d?.data?.product); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" /></div>;
  if (!product) return <div className="container mt-4 alert alert-danger">Product not found.</div>;

  const wishlisted = isInWishlist(product._id);

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(product._id);
    setAdding(false);
    alert("Added to cart!");
  };

  const handleWishlist = async () => {
    if (wishlisted) { await removeFromWishlist(product._id); alert("Removed from wishlist"); }
    else            { await addToWishlist(product._id);      alert("Added to wishlist!");     }
  };

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-sm btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row g-4">
        {/* Image */}
        <div className="col-md-5">
          <img src={product.image} alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "420px", objectFit: "cover", width: "100%" }}
          />
        </div>

        {/* Info */}
        <div className="col-md-7">
          <span className="badge bg-secondary text-capitalize mb-2">{product.category}</span>
          <h2 className="mb-1">{product.name}</h2>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="text-warning fs-5">{"★".repeat(Math.round(product.rating))}</span>
            <span className="text-muted">({product.rating} / 5)</span>
          </div>
          <h3 className="text-primary mb-3">₹{product.price}</h3>
          <p className="text-muted mb-4">{product.description || "High quality product from UrbanCart."}</p>

          <div className="d-flex gap-3 flex-wrap">
            <button className="btn btn-primary btn-lg px-4" onClick={handleAddToCart} disabled={adding}>
              {adding ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-cart-plus me-2" />Add to Cart</>}
            </button>
            <button
              className={`btn btn-lg px-4 ${wishlisted ? "btn-danger" : "btn-outline-danger"}`}
              onClick={handleWishlist}
            >
              <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"} me-2`} />
              {wishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
