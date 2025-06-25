import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import placeholderImg from "../assets/ctf.png";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

const DasNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/dashboard" },
    { name: "Blog", path: "/dashboard/blog" },
    { name: "Country", path: "/dashboard/countrypage" },
    { name: "Contact", path: "/dashboard/contact" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/dashboard/das-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleToggle = () => setOpen(!open);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="max-w-screen-2xl bg-white shadow-md sticky top-0 z-50">
      <nav className="px-6 py-2 flex justify-between items-center max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link to="/" className="w-28">
          <img src={logo} alt="Logo" className="w-full object-contain" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-600">
          {navItems.map(({ name, path }, index) => (
            <li key={index}>
              <NavLink
                to={path}
                end={name === "Overview"}
                className={({ isActive }) =>
                  `flex items-center px-3 py-1 rounded-2xl border transition ${
                    isActive
                      ? "text-white bg-black border-black font-semibold"
                      : "border-black text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2" ref={menuRef}>
            <img
              src={placeholderImg}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border cursor-pointer"
              onClick={handleToggle}
            />
            <FaChevronDown  onClick={handleToggle}/>


            {open && (
              <div className="absolute top-15 right-0 bg-white border shadow-md rounded-md z-50">
              
                  <button onClick={()=>navigate('/')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                    Go to Website
                  </button>
              
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-3 font-medium text-gray-700">
            {navItems.map(({ name, path }, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  end={name === "Overview"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl border ${
                      isActive
                        ? "text-white bg-black border-black font-semibold"
                        : "border-black hover:bg-gray-100"
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default DasNavbar;
