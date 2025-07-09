import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTimes,
  FaPaw,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import pupy from "../assets/pupy.png";
import img6 from "../assets/doga1.png";
import img7 from "../assets/dogaa.png";
import img8 from "../assets/doga3.png";
import img9 from "../assets/dogbg.png";
import ContactForm from "../components/contactForm";

const CaninkartHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-sans text-gray-700 bg-[#DEFED2] max-w-screen-2xl mx-auto">
      {/* ABOUT SECTION */}

      {/* <h2 className="text-sm font-semibold  bg-[#DEFED2] text-orange-500 text-center  ">🧡 ABOUT</h2> */}
      <div className="mt-18">
        <h2 className="  text-orange-500 text-center  py-4 flex justify-center items-center gap-2 text-lg font-semibold">
          <FaPaw/> ABOUT US
        </h2>
        <section className="py-5 px-4  flex flex-col md:flex-row items-center justify-center md:gap-15">
          <img src={pupy} alt="About Dog" className="h-70 " />
          <div>
            <p className=" max-w-xl text-lg">
             Welcome to Caninkart, your trusted partner in premium-quality pet products designed to enrich the lives of pets and the people who love them.
             <p>  Founded with a passion for pets and a commitment to excellence, Caninkart has grown into a leading manufacturer of innovative, durable, and stylish pet accessories. From collars, leashes, and harnesses to cozy beds, protective jackets, and everyday essentials, every product we create reflects our dedication to safety, comfort, and superior craftsmanship.</p>

            </p>
            {/* <button className="mt-4 bg-red-500 text-white text-xs px-4 py-2 rounded">READ MORE</button> */}
          </div>
        </section>
      </div>
      {/* QUOTE SECTION */}
      <section
        className="bg-cover bg-top bg-no-repeat h-[400px] sm:h-[500px] md:h-[600px] w-full flex items-center justify-center px-4 sm:px-8   "
        style={{ backgroundImage: `url(${img9})` }}
      >
        <div className="text-white text-center text-xl  md:text-3xl font-semibold leading-relaxed max-w-4xl ">
          We understand that pets are more than just animals,
          <br />
          they're family members, which is why we prioritize the safety and
          comfort of our furry customers.
        </div>
      </section>

      

      {/* QUALITY SECTION */}
      <section className="bg-lime-100 py-16 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2  items-center">
          <img src={img6} alt="Dog" className="w-120 h-full object-cover" />
          <div>
            <p className=" text-black ml-2 mt-2 max-w-lg text-lg ">
           

            </p>
            <p className=" text-black ml-2 mt-2 max-w-lg text-lg"><h3 className="text-orange-400 font-medium mt-8 underline">Our Mission</h3>
            To deliver thoughtfully designed pet products that combine quality, functionality, and aesthetic appeal—helping pets live happier, healthier lives while giving pet owners peace of mind.
            </p>
           <p className=" text-black ml-2 mt-2 max-w-lg text-lg"><h3 className="text-orange-400 font-medium mt-8 underline">Our Vision</h3>
           To be the most trusted name in pet care, setting the standard for reliability, innovation, and ethical manufacturing in the pet products industry.

            </p>

          </div>
        </div>
        <div className="mt-10   gap-10 items-center relative">
          <div className="flex  gap-4 justify-center md:justify-end">
            <img
              src={img7}
              alt="Dog"
              className="w-40 h-40 md:h-48 md:w-48 lg:h-56 lg:w-56  rounded-full object-cover md:absolute lg:top-10 right-25 "
            />
            <img
              src={img8}
              alt="Dog"
              className="w-35 h-35 lg:h-52 lg:w-52 md:h-44 md:w-44  rounded-full object-cover md:absolute lg:top-40 right-80"
            />
          </div>
          <p className=" text-black max-w-lg md:mt-55 lg:mt-2 md:ml-10 mx-auto text-lg">
            <h2 className="text-orange-400 font-medium text-xl underline">Why choose us</h2>
           ✅ Premium Materials: We use high-grade fabrics and components to ensure durability.<br />
            ✅ Rigorous Quality Control: Every item undergoes thorough inspection before it reaches the customer.<br />

            ✅ Customization Options: From private labelling to tailor-made designs, we cater to retailers, wholesalers, and brands worldwide.<br />

            ✅ Sustainability Focus: We strive to reduce our environmental footprint by incorporating eco-friendly materials and responsible production practices.<br />
            Whether you run a pet store, an online retail brand, or simply want the best for your furry companions, Caninkart is here to help you offer products pets love—and pet parents trust.

            <p className="mt-6 font-bold text-lg text-black">Join us on our journey to make the world a better place for pets.
</p>

          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactForm />
    </div>
  );
};

export default CaninkartHome;
