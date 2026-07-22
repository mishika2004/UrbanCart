

//---------------------------------------------------------------------------------------------------
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="container mt-3">
//       <div className="category-hero">
//         <h2 className="mt-4 py-3 heading hero-text">Shop By Category</h2>
//       </div>

//       <div className="container mt-4">
//         <div className="row text-center">

//           <div className="col-md-2">
//             <Link to="/men" className="text-decoration-none">
//               <div className="category-card">
//                 <img
//                   src="https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=733&auto=format&fit=crop"
//                   alt="men"
//                   className="category-img"
//                 />
//               </div>
//               <p className="category-title">Men</p>
//             </Link>
//           </div>

//           <div className="col-md-2">
//             <Link to="/women" className="text-decoration-none">
//               <div className="category-card">
//                 <img
//                   src="https://images.unsplash.com/photo-1731911656286-92bf1ebc87f3?q=80&w=687&auto=format&fit=crop"
//                   alt="women"
//                   className="category-img"
//                 />
//               </div>
//               <p className="category-title">Women</p>
//             </Link>
//           </div>

//           <div className="col-md-2">
//             <Link to="/electronics" className="text-decoration-none">
//               <div className="category-card">
//                 <img
//                   src="https://images.unsplash.com/photo-1623305615868-6c1134bb8f00?q=80&w=1170&auto=format&fit=crop"
//                   alt="electronics"
//                   className="category-img"
//                 />
//               </div>
//               <p className="category-title">Electronics</p>
//             </Link>
//           </div>

//           <div className="col-md-2">
//             <Link to="/furniture" className="text-decoration-none">
//               <div className="category-card">
//                 <img
//                   src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1332&auto=format&fit=crop"
//                   alt="furniture"
//                   className="category-img"
//                 />
//               </div>
//               <p className="category-title">Furniture</p>
//             </Link>
//           </div>

//           <div className="col-md-2">
//             <Link to="/kids" className="text-decoration-none">
//               <div className="category-card">
//                 <img
//                   src="https://plus.unsplash.com/premium_photo-1684164601357-3e1e5f141d53?q=80&w=687&auto=format&fit=crop"
//                   alt="kids"
//                   className="category-img"
//                 />
//               </div>
//               <p className="category-title">Kids</p>
//             </Link>
//           </div>

//           <div className="col-md-2">
//             <Link to="/home" className="text-decoration-none">
//               <div className="category-card">
//                 <img
//                   src="https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=687&auto=format&fit=crop"
//                   alt="home"
//                   className="category-img"
//                 />
//               </div>
//               <p className="category-title">Home</p>
//             </Link>
//           </div>

//         </div>
//       </div>

     

//     </div>
//   );
// };

// export default Home;

import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = [
  { name: "Men",         path: "/men",         img: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=733&auto=format&fit=crop" },
  { name: "Women",       path: "/women",       img: "https://images.unsplash.com/photo-1731911656286-92bf1ebc87f3?q=80&w=687&auto=format&fit=crop" },
  { name: "Electronics", path: "/electronics", img: "https://images.unsplash.com/photo-1623305615868-6c1134bb8f00?q=80&w=1170&auto=format&fit=crop" },
  { name: "Furniture",   path: "/furniture",   img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1332&auto=format&fit=crop" },
  { name: "Kids",        path: "/kids",        img: "https://plus.unsplash.com/premium_photo-1684164601357-3e1e5f141d53?q=80&w=687&auto=format&fit=crop" },
  { name: "Home",        path: "/home",        img: "https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=687&auto=format&fit=crop" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          minHeight: "420px",
          padding: "60px 20px",
        }}
      >
        <div>
          <h1 className="display-4 fw-bold mb-3">
            Your Urban Shopping <span style={{ color: "#f5a623" }}>Destination</span>
          </h1>
          <p className="lead mb-4 text-light opacity-75">
            Discover trending fashion, furniture, electronics & more — all in one place.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-warning btn-lg px-5 fw-semibold" onClick={() => navigate("/products")}>
              Shop Now →
            </button>
            <button className="btn btn-outline-light btn-lg px-5" onClick={() => navigate("/products")}>
              Browse All
            </button>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-light py-3 border-bottom">
        <div className="container">
          <div className="row text-center">
            {[
              ["🚚", "Free Delivery", "On orders above ₹499"],
              ["🔄", "Easy Returns",  "7-day return policy"],
              ["🔒", "Secure Pay",    "100% safe & encrypted"],
              ["⚡", "Fast Dispatch", "Ships within 24 hours"],
            ].map(([icon, title, sub]) => (
              <div className="col-6 col-md-3 py-2" key={title}>
                <div className="fs-4">{icon}</div>
                <div className="fw-semibold small">{title}</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-2">Shop By Category</h2>
        <p className="text-center text-muted mb-4">Explore our wide range of curated collections</p>

        <div className="row g-4 justify-content-center">
          {CATEGORIES.map(({ name, path, img }) => (
            <div className="col-6 col-md-4 col-lg-2" key={name}>
              <Link to={path} className="text-decoration-none">
                <div className="card border-0 shadow-sm text-center overflow-hidden"
                  style={{ transition: "transform 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                  <img src={img} alt={name} style={{ height: "140px", objectFit: "cover" }} />
                  <div className="card-body py-2 px-1">
                    <p className="fw-semibold mb-0 text-dark">{name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Banner CTA */}
      <div className="bg-warning py-5 text-center">
        <h3 className="fw-bold">🔥 New Arrivals Every Week</h3>
        <p className="text-dark mb-3">Fresh styles just dropped. Don't miss out!</p>
        <button className="btn btn-dark btn-lg px-5" onClick={() => navigate("/products")}>
          Explore New Arrivals
        </button>
      </div>
    </div>
  );
};

export default Home;

