import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import img99 from '../assets/mpd.png'; // Your hero background image
import img100 from '../assets/mpd2.png'

const cityNames = {
  1: "Amritsar", 2: "Ludhiana", 3: "Jalandhar", 4: "Delhi", 5: "Mumbai",
  6: "Chennai", 7: "Bengaluru", 8: "Kolkata", 9: "Hyderabad", 10: "Pune",
  11: "Ahmedabad", 12: "Jaipur", 13: "Surat", 14: "Bhopal", 15: "Chandigarh",
  16: "Nagpur", 17: "Indore", 18: "Patna", 19: "Ranchi", 20: "Guwahati",
  21: "Noida", 22: "Gurgaon", 23: "Varanasi", 24: "Lucknow",
};

function MarketPlacedetails() {
  const { districtId } = useParams();
  console.log("District ID:", districtId); // Log the districtId to check if it's being captured correctly
  const { state } = useLocation();
  const district = state?.districtData;
  const navigate = useNavigate()

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="min-h-screen bg-[#FFFDF4] max-w-screen-2xl mx-auto mt-18">
      {/* Hero Section */}
    <section
  className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] bg-cover bg-bottom bg-no-repeat flex items-center justify-center px-4 sm:px-8"
  style={{ backgroundImage: `url(${img99})` }}
>
  {/* Back Button */}
  <div className="absolute top-4 left-4">
    <button
      onClick={() => navigate(-1)}
      className="text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-md"
    >
      ← Back
    </button>
  </div>

  {/* Text Overlay */}
  <div className="text-white font-[Poppins] text-center text-[28px] md:text-5xl font-semibold leading-relaxed max-w-4xl">
    Caninkart Manufacturers in  { districtId? districtId:district?.name}
  </div>
</section>



      {/* Main Content */}
      <div className="container bg-[#FFFDF4] mx-auto px-4 py-6 max-w-7xl text-gray-700">
        <p className="text-base md:text- leading-relaxed mb-6">
        Caninkart is a leading <span className='font-bold'> Dog Bed Manufacturer in { districtId? districtId:district?.name}</span>. With a strong commitment to quality, innovation, and pet well-being, Caninkart has earned the trust of pet owners across the region and beyond. Our mission is to enhance the lives of pets and their families by offering a wide range of thoughtfully designed and rigorously tested products that meet the highest standards of safety and comfort.

        </p>

        <p className="text-base md:text- leading-relaxed mb-5">
      
        </p>


        {/* Image & Description */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <p className="text-base md:text- leading-relaxed">  From dog harness and dog hut to custom-designed dog collars and other products tailored for specific needs, Caninkart blends functionality with style to ensure every product serves its purpose effectively. Our dedicated team of animal lovers and experts continually works to develop new solutions that reflect our passion for pets and our understanding of their needs.
            Rooted in ethical practices and driven by a love for animals, Caninkart continues to remain a <span className='font-bold'> trusted Manufacturer of Dog Products in { districtId? districtId:district?.name}</span>, making us a trusted choice for pet parents who seek nothing but the best for their furry companions. We specialize in offering a wide range of high-quality pet products, including dog collars, dog harnesses, dog beds, leashes, dog coats, dog mats, as well as cat collars, cat beds, cat huts, and pet homes.

              </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={img100} 
              alt="Corgi dog"
              className="rounded shadow w-full  max-w-sm"
              loading="lazy"
            />
          </div>
        </div>
         <p className="text-base md:text- leading-relaxed py-5">
       Caninkart is recognized as a <span className='font-bold'>top Manufacturer of Dog Harness in { districtId? districtId:district?.name}</span> , known for its commitment to quality, comfort, and durability. With a focus on pet safety and owner satisfaction, Caninkart designs harnesses that offer both functionality and style. Their products are crafted using high-grade materials and are tailored to meet the needs of dogs of all sizes and breeds. Through consistent innovation and attention to detail, Caninkart has earned a strong reputation among pet owners across the city.
        </p>
      </div>

      {/* Bottom Description */}
      
    </div>
  );
}

export default MarketPlacedetails;
