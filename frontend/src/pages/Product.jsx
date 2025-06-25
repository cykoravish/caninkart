import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import img11 from "../assets/pngwing.png";
import ContactForm from "../components/contactForm";
import Productss from "./productdata";

const Product = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#ecf2e7] px-4 sm:px-10 md:px-16 lg:px-10  py-6 sm:py-10 mt-15 max-w-screen-2xl mx-auto">
        <p className="text-center font-semibold text-lg mb-6">Products</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Productss.map((product) => (
            <Link
              key={product.id}
              to={{
                pathname: `/product/${product.id}`,
              }}
              state={{ product }}
              className=" rounded shadow p-2 text-center cursor-pointer hover:ring-2 ring-orange-300 transition duration-200 block bg-white"
            >
              {/* <img
                src={product.image}
                alt="product"
                className="mx-auto w-36 h-20 md:w-52 sm:h-32 object-cover"
              />
              <p className="mt-2 text-lg font-medium">{product.name}</p> */}
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
                                <p className="mt-2 text-lg  font-medium">{product.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Section */}

      <ContactForm />
    </>
  );
};

export default Product;
