import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import ContactForm from "./contactForm";
import Productss from "../pages/productdata";

import { FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner2 from "../assets/banner2.png";
import hero2 from "../assets/caninkarthero.png";
import hero3 from "../assets/herobanner2.png";
import pupy from "../assets/pupy.png";
import img11 from "../assets/pngwing.png";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/Printed_Collar/4.png";
import img2 from "../assets/Fur Lounger/24.png";
import img3 from "../assets/Cave Hut - Grey/11.png";
import img4 from "../assets/Jackets/4.png";
import img5 from "../assets/dwt1.png";

const HomePage = () => {
  const categories = [
    { category: "WALKING ESSENTIALS", image: img1 },
    { category: "BEDDING", image: img2 },
    { category: "CAVE HUT", image: img3 },
    { category: "JACKETS", image: img4 },
    { category: "TOYS", image: img5 },
  ];
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Deepshikha",
      city: "Pune",
      img: "D",
      text: 'This dog bed was a total win! He loves it, and it was worth every penny spent. Love the purchase from Caninkart everytime.',
    },
    {
      name: "Atul ",
      city: "Dehradun",
      img: img1,
      text: 'The harness fits my dog perfectly, and the dog bed is super sturdy. Highly recommend to any pet parent who wants high-quality, well-designed accessories.',
    },
    {
      name: "Piyush",
      city: "Delhi",
      img: img2,
      text: 'They have good R&D team,successfully developed a complex dog sling harness for dogs suffering from IVDD. Good job team',
    },
    {
      name: "Ritika",
      city: "Mumbai",
      img: img3,
      text: 'They offer amazing, durable, and comfortable pet products. I highly recommend to buy these products. Thank you, Caninkar team',
    },
    {
      name: "Vishal",
      city: "Bijnor",
      img: img3,
      text: 'Fantastic service and the cutest products! My puppy is obsessed with the new bed.',
    },
  ];

  const [selectedCategory, setSelectedCategory] =
    useState("WALKING ESSENTIALS");

  const filteredProducts = Productss.filter((product) =>
    Array.isArray(product.category)
      ? product.category.includes(selectedCategory)
      : product.category === selectedCategory
  );

  useEffect(() => {
    // Handle mobile navigation buttons
    const handleMobileNavigation = () => {
      const swiperInstance = document.querySelector(
        ".testimonials-swiper"
      )?.swiper;

      const prevMobile = document.querySelector(".swiper-button-prev-mobile");
      const nextMobile = document.querySelector(".swiper-button-next-mobile");

      if (prevMobile && nextMobile && swiperInstance) {
        prevMobile.addEventListener("click", () => swiperInstance.slidePrev());
        nextMobile.addEventListener("click", () => swiperInstance.slideNext());
      }
    };

    // Delay to ensure swiper is initialized
    setTimeout(handleMobileNavigation, 100);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans text-gray-800 max-w-screen-2xl mx-auto">
      <div className=" md:relative overflow-hidden  text-center flex flex-col items-center mt-14 ">
        <img
          // src={img96 || "/placeholder.svg"}
          src={hero2}
          alt="Product"
          className="w-full  mx-auto h-auto object-contain hidden md:flex "
        />

        <img
          src={hero3 || "/placeholder.svg"}
          alt="Product"
          className="w-full h-auto object-contain md:hidden py-4"
        />
      </div>

      {/* Categories */}

      <section className="py-10 text-center">
        <h2 className="text-lg font-semibold  text-orange-500 mb-4 flex justify-center items-center gap-2">
          <FaPaw /> CATEGORY
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 lg:mx-10 mx-auto  md:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex flex-col items-center my-3 cursor-pointer`}
              onClick={() =>
                navigate("/category-products", {
                  state: { selectedCategory: category.category },
                })
              }
            >
              <div className="bg-[#ECDDC7] rounded-full px-5 py-5 md:h-52 md:w-52 h-40 w-40 ">
                <img
                  src={category.image}
                  alt={category.category}
                  className="md:h-40 mx-auto object-contain"
                />
              </div>
              <p
                className={`my-2   ${
                  selectedCategory === category.category
                    ? "text-orange-500 font-bold "
                    : ""
                }`}
              >
                {category.category}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-[#E7EDE6] text-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, idx) => {
            return (
              <div
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
                key={product.id}
                className="bg-white px-2 sm:px-4 md:px-4 lg:px-8 py-4 sm:py-6 md:py-4 shadow-md rounded cursor-pointer hover:ring-2 ring-orange-300 transition duration-200"
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
              </div>
            );
          })}
        </div>
      </section> */}

      {/* Top Sellers */}
      {/* <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-[#E7EDE6] text-center">
        <h2 className="font-semibold mb-4 text-lg text-orange-500 flex justify-center items-center gap-2">
          <FaPaw /> TOP SELLERS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4 ">
          {Productss.slice(12, 20).map((product, idx) => {
            return (
              <motion.div
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
                key={product.id}
                className="bg-white px-2 sm:px-4 md:px-4 lg:px-8 py-4 sm:py-6 md:py-4 shadow-md rounded cursor-pointer hover:ring-2 ring-orange-300 transition duration-200"
                initial={{ rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false }}
                style={{ transformStyle: "preserve-3d" }}
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
                <p className="mt-2 text-lg  font-medium">{product.name}</p>
              </motion.div>
            );
          })}
        </div>
      </section> */}

      {/* Promo Banner */}
      <div className="w-full max-w-[1400px] mx-auto ">
        <img
          // src={img96 || "/placeholder.svg"}
          src={banner2}
          alt="Product"
          className="w-full max-w-[1500px] mx-auto h-auto object-contain hidden md:flex p-4 "
        />

        <img
          src={banner2 || "/placeholder.svg"}
          alt="Product"
          className="w-full h-auto object-contain md:hidden py-4"
        />
      </div>

      {/* Products */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-[#E7EDE6] text-center">
        <h2 className="font-semibold mb-4 text-lg text-orange-500 flex justify-center items-center gap-2">
          <FaPaw /> Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {Productss.slice(0, 12).map((product, idx) => {
            return (
              <div
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
                key={product.id}
                className="bg-white  px-2 py-4 sm:py-6 md:py-4 shadow-md rounded cursor-pointer ring-orange-300 transition duration-200"
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
                <p className="mt-2 text-lg  font-medium">{product.name}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <div className="mt- bg-green-200">
        <h2 className="text-lg font-semibold text-orange-500 text-center  py-4 flex justify-center items-center gap-2 ">
          <FaPaw /> ABOUT
        </h2>
        <section className="py-5 px-4  flex flex-col md:flex-row items-center justify-center md:gap-15">
          <img src={pupy} alt="About Dog" className="h-70 " />
          <div>
            <p className="text-lg max-w-md">
              As a leading manufacturer and exporter of pet accessories,
              Caninkart has gained a reputation for producing top-notch pet
              products that cater to the needs of pets of all shapes and sizes.
              Caninkart has been dedicated to creating innovative and practical
              pet products that enhance the lives of pets and their owners.
            </p>
            <Link to="/about">
              <button className="mt-4 bg-red-500 text-white text-xs px-4 py-2 rounded">
                READ MORE
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Testimonials with Swiper */}
      <section className="bg-[#fff9ed] py-14 text-center overflow-hidden">
        <h2 className="text-lg gap-2 font-semibold text-orange-500 mb-3 flex justify-center items-center ">
          <FaPaw /> TESTIMONIALS
        </h2>
        <h3 className="font-black text-xl mb-10">
          Trusted by Pet Lovers Everywhere
        </h3>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Left Nav */}
            <button className="swiper-button-prev-custom hidden md:flex items-center justify-center w-10 h-10 bg-white border-2 border-orange-500 rounded-full shadow hover:bg-orange-500 hover:text-white absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              loop={true}
              speed={3000} // 3 seconds for smooth slide transition
              autoplay={{
                delay: 0, // no delay between slides
                disableOnInteraction: false, // keep autoplay even if user interacts
              }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((item, idx) => (
                <SwiperSlide key={idx} className="h-full flex">
                  <div className="bg-white p-6 rounded-2xl shadow-md text-left flex flex-col h-[240px] relative my-4 mx-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#FDDF82] flex items-center justify-center absolute -top-10 -left-10 text-4xl ">
                        ❝
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed  flex grow pt-4">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-3 border-t">
                      {/* <img
                        src={item.img || "/placeholder.svg"}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      /> */}
                      <div className="w-10 h-10 rounded-full bg-[#FDDF82]  flex items-center justify-center font-semibold text-lg">
                        {item.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">{item.city}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Nav */}
            <button className="swiper-button-next-custom hidden md:flex items-center justify-center w-10 h-10 bg-white border-2 border-orange-500 rounded-full shadow hover:bg-orange-500 hover:text-white absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Swiper Pagination style */}
          <style>{`
          .testimonials-swiper .swiper-pagination {
            bottom: -10px !important;
            position: relative;
            margin-top: 30px;
            display: flex;
            justify-content: center;
          }
          .testimonials-swiper .swiper-pagination-bullet {
            background-color: #fbbf24;
            opacity: 0.4;
            width: 6px;
            height: 6px;
            margin: 0 4px;
            transition: all 0.3s ease;
          }
          .testimonials-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            background-color: #f97316;
            transform: scale(1.3);
          }
        `}</style>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />
      {/* <h1 class="fredoka-heading">This is Fredoka One Font</h1> */}
    </div>
  );
};

export default HomePage;
