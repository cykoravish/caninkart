// // src/pages/CategoryProducts.jsx
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Productss from "../pages/productdata";
// import img11 from "../assets/pngwing.png";
// import { useEffect } from "react";

// const CategoryProducts = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { selectedCategory } = location.state || {};

//   const filteredProducts = Productss.filter((product) =>
//     Array.isArray(product.category)
//       ? product.category.includes(selectedCategory)
//       : product.category === selectedCategory
//   );

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-[#ecddc7] text-center max-w-screen-2xl mx-auto mt-20">
//       <button onClick={() => navigate(-1)}>Back</button>
//       <h2 className="text-xl font-semibold text-orange-500 mb-6">
//         Products in: {selectedCategory}
//       </h2>

//       {filteredProducts.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white p-4 shadow-md rounded-md cursor-pointer hover:ring-2 ring-orange-300 transition duration-200"
//               onClick={() =>
//                 navigate(`/product/${product.id}`, { state: { product } })
//               }
//             >
//               <div className="w-full h-40 flex items-center justify-center bg-white">
//                 <img
//                   src={product.image || img11}
//                   alt={product.name}
//                   className="max-h-full object-contain"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = img11;
//                   }}
//                 />
//               </div>
//               <p className="mt-2 text-base font-medium">{product.name}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No products found in this category.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryProducts;
// src/pages/CategoryProducts.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Productss from "../pages/productdata";
import img11 from "../assets/pngwing.png";
import { FaArrowLeft } from "react-icons/fa";

const CategoryProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCategory = location.state?.selectedCategory || "WALKING ESSENTIALS";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allCategories = [
    "WALKING ESSENTIALS",
    "BEDDING",
    "CAVE HUT",
    "JACKETS",
    "TOYS",
  ];

  useEffect(() => {
    const results = Productss.filter((product) =>
      Array.isArray(product.category)
        ? product.category.includes(selectedCategory)
        : product.category === selectedCategory
    );
    setFilteredProducts(results);
  }, [selectedCategory]);

   useEffect(() => {
   window.scrollTo(0, 0);
 }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-22 bg-[#ecddc7] min-h-screen max-w-screen-2xl mx-auto">
         <button className="flex items-center px-5 mt-5" onClick={() => navigate(-1)}> <FaArrowLeft/>Back</button>
      {/* Category Selector */}
      <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        Browse by Category
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm border transition duration-200 ${
              selectedCategory === category
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
        Showing: {selectedCategory}
      </h3> */}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/product/${product.id}`, { state: { product } })
              }
              className="bg-white p-4 shadow-md rounded-md cursor-pointer hover:ring-2 ring-orange-300 transition duration-200"
            >
              <div className="w-full h-40 flex items-center justify-center bg-white">
                <img
                  src={product.image || img11}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = img11;
                  }}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>
              <p className="mt-2 text-base text-center font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default CategoryProducts;
