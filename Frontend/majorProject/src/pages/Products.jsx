// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Products = () => {

//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const searchQuery = params.get("search") || "";

//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // fetch products
//   const getProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.log("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   // filter products based on search
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // add to cart
//   const addToCart = async (productId, e) => {
//     e.stopPropagation();

//     await fetch("http://localhost:3000/api/cart/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: "user1",
//         productId: productId,
//       }),
//     });

//     alert("Added to Cart");
//   };

//   // add to wishlist
//   const addToWishlist = async (productId, e) => {
//     e.stopPropagation();

//     await fetch("http://localhost:3000/api/wishlist/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: "user1",
//         productId: productId,
//       }),
//     });

//     alert("Added to Wishlist");
//   };

//   return (
//     <div className="container mt-4">

//       <h2 className="mb-4">
//         {searchQuery ? `Search Results for "${searchQuery}"` : "Products"}
//       </h2>

//       <div className="row justify-content-start">

//         {filteredProducts.length === 0 ? (
//           <h5>No products found</h5>
//         ) : (

//           filteredProducts.map((product) => (

//             <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex" key={product._id}>

//             <div
//                 className="card w-100"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => navigate(`/product/${product._id}`)}
//                 >

//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ height: "220px", objectFit: "cover" }}
//                 />

//                 <div className="card-body">

//                   <h5>{product.name}</h5>

//                   <p>₹{product.price}</p>

//                   <p>⭐ {product.rating}</p>

//                   <button
//                     className="btn btn-primary me-2"
//                     onClick={(e) => addToCart(product._id, e)}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     className="btn btn-outline-danger"
//                     onClick={(e) => addToWishlist(product._id, e)}
//                   >
//                     Wishlist
//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))
//         )}

//       </div>

//     </div>
//   );
// };

// export default Products;


import { useEffect, useState } from "react";
import { useLocation }        from "react-router-dom";
import ProductCard            from "../components/ProductCard";
import { apiUrl }             from "../config/api";

const CATEGORIES = ["men", "women", "kids", "home", "furniture", "electronics"];

const Products = () => {
  const location    = useLocation();
  const params      = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";
  const catQuery    = params.get("category") || "";

  const [products,         setProducts]         = useState([]);
  const [loading,          setLoading]           = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [minRating,        setMinRating]         = useState(0);
  const [sortOrder,        setSortOrder]         = useState("");
  const [search,           setSearch]            = useState(searchQuery);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await fetch(apiUrl("/api/products"));
      const data = await res.json();
      setProducts(data?.data?.products || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  // update search when URL changes
  useEffect(() => { setSearch(searchQuery); setSelectedCategory(catQuery); }, [location.search]);

  const clearFilters = () => {
    setSelectedCategory("");
    setMinRating(0);
    setSortOrder("");
    setSearch("");
  };

  let filtered = [...products];

  if (search)           filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  if (selectedCategory) filtered = filtered.filter((p) => p.category === selectedCategory);
  if (minRating)        filtered = filtered.filter((p) => p.rating  >= minRating);
  if (sortOrder === "low")  filtered.sort((a, b) => a.price - b.price);
  if (sortOrder === "high") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="container-fluid mt-4 px-4">
      <div className="row">

        {/* ── Sidebar ── */}
        <aside className="col-md-3 col-lg-2 mb-4">
          <div className="card shadow-sm p-3">
            <h6 className="fw-bold mb-3">Filters</h6>

            {/* Category */}
            <p className="fw-semibold mb-2 small text-uppercase text-muted">Category</p>
            {CATEGORIES.map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat}`}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                />
                <label className="form-check-label text-capitalize" htmlFor={`cat-${cat}`}>{cat}</label>
              </div>
            ))}

            <hr />

            {/* Rating */}
            <p className="fw-semibold mb-2 small text-uppercase text-muted">Min Rating: {minRating} ★</p>
            <input
              type="range" className="form-range"
              min="0" max="5" step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            />

            <hr />

            {/* Sort */}
            <p className="fw-semibold mb-2 small text-uppercase text-muted">Sort by Price</p>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="sort" id="sort-low"
                checked={sortOrder === "low"} onChange={() => setSortOrder("low")} />
              <label className="form-check-label" htmlFor="sort-low">Low → High</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="sort" id="sort-high"
                checked={sortOrder === "high"} onChange={() => setSortOrder("high")} />
              <label className="form-check-label" htmlFor="sort-high">High → Low</label>
            </div>

            <hr />

            <button className="btn btn-outline-secondary btn-sm w-100" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <main className="col-md-9 col-lg-10">
          <h4 className="mb-3">
            {search ? `Results for "${search}"` : selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : "All Products"}
            <span className="text-muted small ms-2">({filtered.length} items)</span>
          </h4>

          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading…</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="alert alert-info">No products found. Try clearing your filters.</div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
              {filtered.map((product) => (
                <div className="col" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Products;
