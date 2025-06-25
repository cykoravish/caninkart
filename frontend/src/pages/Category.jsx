import React, { useEffect, useState } from 'react'
import Productss from './productdata'
import {Link} from "react-router-dom"

const Category = () => {

    const [selectedCategory , setSelectedCategory] = useState("All")
    const [filterProducts , setFilterProducts] = useState(Productss)

    const categories = ["All", ...new Set(Productss.map(p => p.category))]

    useEffect(()=>{
        if(selectedCategory === "All"){
            setFilterProducts(Productss)
        } else {
            setFilterProducts(
                Productss.filter(p => p.category === selectedCategory)
            )
        }
    }, [selectedCategory])
  return (
    <>
     <div className="bg-[#ecf2e7] px-4 sm:px-10 md:px-16 lg:px-10 py-6 sm:py-10 max-w-screen-2xl mx-auto">
        <p className="text-center font-semibold text-xl mb-6">Products</p>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? "bg-orange-400 text-white"
                  : "bg-white text-black"
              } hover:bg-orange-200 transition duration-200`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filtered Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filterProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              state={{ product }}
              className="bg-[#f5f4ef] rounded shadow p-2 text-center cursor-pointer hover:ring-2 ring-orange-300 transition duration-200 block"
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
              <p className="mt-2 text-lg font-medium">{product.name}</p>
            </Link>
          ))}
        </div>
      </div>

    </>
  )
}

export default Category