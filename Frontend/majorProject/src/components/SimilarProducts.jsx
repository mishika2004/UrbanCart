import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";
import "./ChatWidget.css";

const SimilarProducts = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(apiUrl(`/api/ai/similar-products/${productId}`))
      .then((r) => r.json())
      .then((d) => {
        setProducts(d?.data?.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="similar-products">
        <div className="similar-products__title">
          ✨ Similar Products
        </div>
        <div className="text-muted">Loading recommendations…</div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="similar-products">
      <div className="similar-products__title">
        ✨ You Might Also Like
      </div>
      <div className="similar-products__grid">
        {products.map((p) => (
          <div
            key={p._id}
            className="similar-products__card"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img src={p.image} alt={p.name} />
            <div className="similar-products__card-body">
              <h6>{p.name}</h6>
              <span className="price">₹{p.price}</span>
              <span className="rating" style={{ marginLeft: 8 }}>⭐{p.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
