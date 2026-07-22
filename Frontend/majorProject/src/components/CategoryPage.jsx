import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { apiUrl } from "../config/api";

const CategoryPage = ({ category, title }) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl("/api/products"))
      .then((r) => r.json())
      .then((d) => {
        const all      = d?.data?.products || [];
        const filtered = category ? all.filter((p) => p.category === category) : all;
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading…</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{title} <span className="text-muted small">({products.length} items)</span></h3>
      {products.length === 0 ? (
        <p className="text-muted">No products found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
          {products.map((product) => (
            <div className="col" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
