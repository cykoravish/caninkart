import React, { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [contactData, setContactData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalStates, setTotalStates] = useState(0);
  const [totalDistricts, setTotalDistricts] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
            } catch {
              return { ...country, flag: "" };
            }
          })
        );

        const countryCount = countriesWithFlags.length;
        let stateCount = 0;
        let districtCount = 0;

        countriesWithFlags.forEach((country) => {
          stateCount += country.states?.length || 0;
          country.states?.forEach((state) => {
            districtCount += state.districts?.length || 0;
          });
        });

        setTotalCountries(countryCount);
        setTotalStates(stateCount);
        setTotalDistricts(districtCount);
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cnt/contact`);
        setContactData(res.data);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchContactData();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const data = [
    { label: "Blog", value: blogs.length },
    { label: "Country", value: totalCountries },
    { label: "State", value: totalStates },
    { label: "District", value: totalDistricts },
  ];

  return (
    <div className="bg-[#D7D9DD] min-h-screen px-4 py-6">
      <div className="max-w-screen-xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Overview</h2>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-gray-500 text-sm sm:text-base">{item.label}</p>
                <h3 className="text-3xl sm:text-4xl font-bold">{item.value}</h3>
              </div>
              <FiArrowUpRight className="text-gray-300 text-2xl sm:text-3xl" />
            </div>
          ))}
        </div>

        {/* Contact and Blog Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Contact Table */}
          <div className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto w-full md:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-600 font-medium">Contact</h3>
              <Link to={`/dashboard/contact`}>
                <span className="text-blue-500 text-sm hover:underline">
                  View Details
                </span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2 pr-4">S no</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Contact</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contactData.map((data, index) => (
                    <tr key={data._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-4">{index + 1}</td>
                      <td className="py-2 pr-4">{data.name}</td>
                      <td className="py-2 pr-4">{data.contact}</td>
                      <td className="py-2 pr-4">{data.email}</td>
                      <td
                        className="py-2 pr-4 max-w-[150px] truncate text-blue-600 cursor-pointer"
                        onClick={() => setSelectedMessage(data.message)}
                      >
                        {data.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Full Message */}
          {selectedMessage && (
            <div className="fixed inset-0 bg-[#EFF1F3] bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Message</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage}</p>
              </div>
            </div>
          )}

          {/* Blog Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto w-full md:w-1/3 mt-6 md:mt-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-600 font-medium">My Blog</h3>
              <Link to="/dashboard/blog">
                <span className="text-blue-500 text-sm hover:underline">View Details</span>
              </Link>
            </div>
            {blogs.length === 0 ? (
              <p className="text-center text-gray-500">No blogs available</p>
            ) : (
              <div className="space-y-6">
                {blogs.slice(0, 5).map((blog) => (
                  <div key={blog._id} className="flex gap-4 items-start">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_BACKEND}/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs bg-black text-white px-2 py-1 rounded-md w-fit mb-1">
                        {blog.tags?.[0] || "Blog"}
                      </span>
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(blog.date).toLocaleDateString()} • By{" "}
                        {blog.author || "Admin"}
                      </p>
                      <h4 className="text-sm font-semibold leading-snug text-gray-800">
                        {blog.title.length > 60
                          ? blog.title.slice(0, 60) + "..."
                          : blog.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
