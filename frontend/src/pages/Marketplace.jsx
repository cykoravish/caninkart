import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img12 from "../assets/Indiabanner.png";
import { FaGreaterThan, FaLessThan, FaMapMarkerAlt } from "react-icons/fa";
import { TfiArrowTopRight } from "react-icons/tfi";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const LocationHierarchy = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCountryId, setExpandedCountryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/countries/hierarchy`
        );
        const countriesWithFlags = await Promise.all(
          res.data.map(async (country) => {
            try {
              const flagRes = await axios.get(
                `https://restcountries.com/v3.1/name/${country.name}?fullText=true`
              );
              return { ...country, flag: flagRes.data[0]?.flags?.png || "" };
            } catch (flagErr) {
              console.error(`Flag not found for ${country.name}`, flagErr);
              return { ...country, flag: "" };
            }
          })
        );
        setLocations(countriesWithFlags);
      } catch (err) {
        console.error("Error fetching location data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      const timer = setTimeout(() => {
        const swiper = new Swiper(".swiper-container", {
          slidesPerView: "auto",
          spaceBetween: 16,
          navigation: {
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          },
          slidesPerGroup: 1,
          centeredSlides: false,
          watchOverflow: true,
        });

        return () => swiper.destroy(true, true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [locations]);

  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  const toggleCountry = (countryId) => {
    setExpandedCountryId((prev) => (prev === countryId ? null : countryId));
  };

  const handleStateClick = (state) => {
    navigate(`/districts/${state._id}`, { state: { stateData: state } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
        .swiper-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 0 40px;
        }
        .swiper-wrapper {
          display: flex;
          align-items: center;
        }
        .swiper-slide {
          width: auto !important;
          flex-shrink: 0;
        }
        .custom-prev,
        .custom-next {
          color: #ECDDC7;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
          z-index: 10;
          cursor: pointer;
        }
        .custom-prev { left: 0; }
        .custom-next { right: 0; }
        .swiper-pagination-bullet {
          background: #ECDDC7;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #ECDDC7;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}
      </style>

      {/* Banner */}
      <div className="max-w-screen-2xl mx-auto">
        <img src={img12} alt="India banner" className="w-full h-auto mx-auto" />
      </div>

      <div className="bg-[#FFFDF4] max-w-screen-2xl mx-auto py-8">
        <div className="max-w-[1500px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8 animate-fade-in">
            Location Hierarchy Explorer
          </h2>

          {locations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 text-lg">No location data available.</p>
            </div>
          ) : (
            <>
              <div className="swiper-container  max-w-[1400px] mx-auto relative">
                <div className="swiper-wrapper ">
                  {locations.map((country) => (
                    <div key={country._id} className="swiper-slide">
                      <button
                        onClick={() => toggleCountry(country._id)}
                        className="p-4 flex flex-col items-center"
                        aria-expanded={expandedCountryId === country._id}
                      >
                        {country.flag && (
                          <img
                            src={country.flag}
                            alt={`Flag of ${country.name}`}
                            className="w-24 h-24 min-w-[96px] min-h-[96px] object-cover rounded-full border mb-2"
                            loading="lazy"
                          />
                        )}
                        <h3 className={` text-xl font-semibold ${expandedCountryId === country._id ? "text-blue-600" : ""} `}>
                          {country.name}
                        </h3>
                        <span className="text-gray-500 mt-1">
                          {expandedCountryId === country._id ? "-" : "+"}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="custom-prev" aria-label="Previous slide">
                  <FaLessThan />
                </div>
                <div className="custom-next" aria-label="Next slide">
                  <FaGreaterThan />
                </div>
              </div>

              {expandedCountryId && (
                <div className="mt-6 p-4  max-w-[1400px]  lg:ml-23 ml-2 ">
                  {locations.find((c) => c._id === expandedCountryId)?.states.length === 0 ? (
                    <p className="text-gray-600 italic">No states found.</p>
                  ) : (
                    <ul className="flex flex-wrap justify-start gap-10">
                      {locations
                        .find((c) => c._id === expandedCountryId)
                        ?.states.map((state) => (
                          <li
                            key={state._id}
                            className="w-[16.67%] min-w-[150px] flex-shrink-0"
                          >
                            <button
                              onClick={() => handleStateClick(state)}
                              className="w-full flex items-center justify-between py-4 px-3 bg-[#F0F2F3] rounded-md shadow-sm hover:bg-gray-200 transition-colors"
                            >
                              <div className="items-center space-y-3">
                                <div className="bg-white rounded w-8 h-8 p-1.5">
                                  <FaMapMarkerAlt className="text-black w-5 h-5" />
                                </div>
                                <span className="font-medium text-lg">
                                  {state.name}
                                </span>
                              </div>
                              <TfiArrowTopRight className="text-[#B9E9F9] w-10 h-10" />
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationHierarchy;
