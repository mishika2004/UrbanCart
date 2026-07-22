import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext }     from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart, cartItems }         = useContext(CartContext);
  const navigate = useNavigate();

  const handleMoveToCart = async (product) => {
    await addToCart(product._id);
    await removeFromWishlist(product._id);
    alert("Moved to cart!");
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <i className="bi bi-heart" style={{ fontSize: "5rem", color: "#ccc" }} />
        <h4 className="mt-3 text-muted">Your wishlist is empty</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">❤️ My Wishlist ({wishlist.length} items)</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {wishlist.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image} alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/product/${product._id}`)}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.name}</h6>
                <p className="text-muted small text-capitalize mb-1">{product.category}</p>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">₹{product.price}</span>
                  <span className="text-warning small">★ {product.rating}</span>
                </div>
                <button
                  className="btn btn-primary btn-sm mb-2"
                  onClick={() => handleMoveToCart(product)}
                >
                  <i className="bi bi-cart-plus me-1" /> Move to Cart
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => { removeFromWishlist(product._id); alert("Removed from wishlist"); }}
                >
                  <i className="bi bi-trash me-1" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
