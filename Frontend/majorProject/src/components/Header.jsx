import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext }     from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { cartCount }  = useContext(CartContext);
  const { wishlist }   = useContext(WishlistContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) navigate(`/products?search=${searchText.trim()}`);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid px-4">

          {/* Brand */}
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            🛍️ <span style={{ color: "#f5a623" }}>Urban</span>Cart
          </NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarMain" aria-controls="navbarMain"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">

            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" end>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">Products</NavLink>
              </li>
            </ul>

            {/* Search */}
            <form className="d-flex me-3" role="search" onSubmit={handleSearch}>
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ minWidth: "200px" }}
              />
              <button className="btn btn-sm btn-warning" type="submit">
                <i className="bi bi-search" />
              </button>
            </form>

            {/* Right icons */}
            <ul className="navbar-nav gap-1 align-items-center">

              {/* Wishlist */}
              <li className="nav-item">
                <NavLink to="/wishlist" className="nav-link position-relative px-2">
                  <i className="bi bi-heart fs-5" />
                  {wishlist.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.6rem" }}>
                      {wishlist.length}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* Cart */}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link position-relative px-2">
                  <i className="bi bi-cart3 fs-5" />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                      style={{ fontSize: "0.6rem" }}>
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* Profile */}
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link px-2">
                  <i className="bi bi-person-circle fs-5" />
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
