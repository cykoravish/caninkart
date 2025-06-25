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
    Caninkart Manufacturers in  {district?.name}
  </div>
</section>



      {/* Main Content */}
      <div className="container bg-[#FFFDF4] mx-auto px-4 py-12 max-w-7xl text-gray-700">
        <p className="text-base md:text- leading-relaxed mb-6">
          When it comes to selecting the perfect dog collar for your furry companion, quality and craftsmanship are key factors to consider. In a market flooded with options, Caninkart has emerged as a standout manufacturer of top-of-the-line dog collars that combine precision and perfection in every design. With a commitment to excellence and a dedication to providing pet owners with the highest quality products, we have earned a reputation as the industry leader in dog collar manufacturing. From durable materials to innovative designs, we've set the standard for reliability and style in the pet accessory market
        </p>

        <p className="text-base md:text- leading-relaxed mb-10">
          n this article, we will explore the reasons why we stand out as the best dog collar manufacturer in India, examining the company's attention to detail, commitment to quality, and innovative approach to pet accessories. Whether you're looking for a dog collar that's comfortable, stylish, or functional, we have a wide range of options to suit every pet owner's needs. Join us as we delve into the world of Caninkart and discover why our products are the go-to choice for discerning pet owners everywhere.
        </p>

        {/* Image & Description */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <p className="text-base md:text- leading-relaxed">
              When it comes to selecting the perfect dog collar for your furry companion, quality and craftsmanship are key factors to consider. In a market flooded with options, Caninkart has emerged as a standout manufacturer of top-of-the-line dog collars that combine precision and perfection in every design. With a commitment to excellence and a dedication to providing pet owners with the highest quality products, we have earned a reputation as the industry leader in dog collar manufacturing. From durable materials to innovative designs, we've set the standard for reliability and style in the pet accessory market
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
      </div>

      {/* Bottom Description */}
      
    </div>
  );
}

export default MarketPlacedetails;
