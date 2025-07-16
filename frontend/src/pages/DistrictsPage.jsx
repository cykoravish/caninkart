// src/components/DistrictsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import img12 from "../assets/Indiabanner.png";
import img99 from '../assets/mpd.png'; 
import { TfiArrowTopRight } from "react-icons/tfi";

const DistrictsPage = () => {
  const { stateId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateName, setStateName] = useState(state?.stateData?.name || "");

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        // If state data is not passed via location, fetch it
        if (!state?.stateData) {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND}/states/${stateId}`
          );
          setStateName(res.data.name);
          console.log("State Name:", res.data.name);
          setDistricts(res.data.districts || []);
        } else {
          setDistricts(state.stateData.districts || []);
        }
      } catch (err) {
        console.error("Error fetching district data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
    window.scrollTo(0, 0);
  }, [stateId, state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="w-full mx-auto">
        <img src={img12} alt="India banner" className="w-full h-auto mx-auto" />
      </div>
      <div className="min-h-screen bg-[#FFFDF4] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
          >
            ← Back to Locations
          </button>
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
            Districts in {stateName}
          </h2> */}

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
              Districts in {stateName}
            </div>
          </section>
      <div className="text-center cursor-pointer"  onClick={() =>
                      navigate(`/${stateId}/${stateName.toLowerCase().replace(/\s+/g, "-")}`, {
                        state: { districtData: stateName },
                      })
                    }>
  <div className="px-6 py-3 rounded-lg mt-2.5 bg-zinc-200 inline-block items-center my-auto text-2xl transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <div className="flex items-center justify-center gap-2">
      <span className="my-auto text-zinc-800">{stateName}</span>
      <span><TfiArrowTopRight className="text-zinc-400" /></span>
    </div>
  </div>
</div>



          {districts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 text-lg">No districts found.</p>
            </div>
          ) : (
            <ul className="flex flex-row flex-wrap md:gap-10 gap-5 max-w-[1400px]   justify-center mx-auto mt-4 p-4">
              {districts.map((district) => (
                <li
                  key={state._id}
                  className="w-[12%]  h-[100px]  sm:w-[16%] lg:w-[18%] min-w-[100px] sm:min-w-[150px] lg:min-w-[170px]"
                >
                  <button
                    onClick={() =>
                      navigate(`/${stateId}/${district.name.toLowerCase().replace(/\s+/g, "-")}`, {
                        state: { districtData: district },
                      })
                    }
                    className="w-full flex items-center justify-between py-4 px-3 bg-[#F0F2F3]  rounded-md shadow-sm hover:bg-gray-200 transition-colors"
                  >
                    <div className="items-center space-y-3">
                      <div className="bg-white rounded w-8 h-8 p-1.5">
                        <FaMapMarkerAlt className="text-black w-5 h-5" />
                      </div>
                      <span className="line-clamp-2 font-medium text-sm lg:text-base">
                        {district.name}
                      </span>
                    </div>
                    <TfiArrowTopRight className="text-[#B9E9F9] w-10 h-10" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      {/* </div> */}
    </>
  );
};

export default DistrictsPage;
