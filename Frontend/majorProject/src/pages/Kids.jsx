// import React, { useEffect, useState } from "react";

// const Kids = () => {

//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/products");
//       const data = await response.json();

//       const filtered = data.filter(
//         (product) => product.category === "kids"
//       );

//       setProducts(filtered);

//     } catch (error) {
//       console.log("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <div className="container mt-4">

//       <h2 className="mb-4">Men Products</h2>

//       <div className="row">

//         {products.map((product) => (

//           <div className="col-md-3 mb-4" key={product._id}>

//             <div className="card h-100">

//               <img
//                 src={product.image}
//                 className="card-img-top"
//                 alt={product.name}
//                 style={{ height: "200px", objectFit: "cover" }}
//               />

//               <div className="card-body">

//                 <h6>{product.name}</h6>

//                 <p>₹{product.price}</p>

//                 <p>⭐ {product.rating}</p>

//                 <button className="btn btn-primary w-100">
//                   Add to Cart
//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default Kids;
import CategoryPage from "../components/CategoryPage";
const Kids = () => <CategoryPage category="kids" title="Kids' Collection" />;
export default Kids;