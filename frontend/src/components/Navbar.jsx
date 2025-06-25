import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import logo from "../assets/logo.png";
import Productss from "../pages/productdata";
const Navbar = () => {
   const searchRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const navLinks = ["home", "product", "about", "blog", "contact"];

  useEffect(() => {
    const searchedProducts = Productss.filter((product, idx) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchedProducts(searchedProducts);
  }, [searchQuery]);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    setSearchQuery("");
    
    setShowSearch(false); 
  };

  
  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Left */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Caninkart Logo" className="h-14 w-auto" />
        </NavLink>

        {/* Nav Links - Center */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700 mx-auto">
          {navLinks.map((item) => (
            <li key={item}>
              <NavLink
                to={item === "home" ? "/" : `/${item}`}

                className={({ isActive }) =>
                  `group relative inline-block transition-colors ${
                    isActive
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }`
                }
              >
                {item.toUpperCase()}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search + Menu - Right */}
        <div className="flex items-center relative space-x-3">
          {/* Sliding Search Input */}
          
          {/* Always visible Search Input */}
          <div ref={searchRef} className="relative w-48 sm:w-72 transition-all">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            >
              <input
                type="text"
                className="flex-1 px-3 py-2 text-sm outline-none"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-2 sm:px-4 py-2 hover:bg-orange-600 md:block hidden"
              >
                Go
              </button>
            </form>

            {/* Search Results */}
            {searchQuery && (
              <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-md max-h-60 overflow-auto">
                {searchedProducts.length > 0 ? (
                  searchedProducts.map((product, idx) => (
                    <Link
                      key={idx}
                      to={`/product/${product.id}`}
                      state={{ product }}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      onClick={() => setSearchQuery("")}
                    >
                      {product.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden px-6 pt-2 pb-4 space-y-3 font-medium text-gray-700 transition-all duration-300 ease-in-out ${
          isOpen ? "block animate-slide-down" : "hidden"
        }`}
      >
        {navLinks.map((item) => (
          <div key={item}>
            <NavLink
              to={`/${item}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group relative inline-block transition-colors ${
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
                }`
              }
            >
              {item.toUpperCase()}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300"></span>
            </NavLink>
          </div>
        ))}

        {/* Mobile Search */}
        {/* <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        >
          <input
            type="text"
            className="px-3 py-2 text-sm outline-none w-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-3 py-2 hover:bg-orange-600 "
          >
            Go
          </button>
        </form> */}
      </div>
    </nav>
  );
};

export default Navbar;
