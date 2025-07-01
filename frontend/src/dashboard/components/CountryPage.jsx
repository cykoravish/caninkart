import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/countries/view`
      );
      setCountries(res.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };


  const handleAddCountry = async () => {
  if (!form.name || !countryList.includes(form.name)) {
    toast.warning("Please enter a valid country name");
    return;
  }

  try {
    if (isEditing && editingId) {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/countries/update/${editingId}`,
        form
      );
      setCountries((prev) =>
        prev.map((c) => (c._id === editingId ? { ...c, name: form.name } : c))
      );
      toast.success("Country updated successfully");
    } else {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/countries/add`,
        form
      );
      console.log("New country added:", res.data); // <-- Debug line

      // Fallback: Re-fetch countries if backend doesn't return _id
      if (!res.data || !res.data._id) {
        fetchCountries();
      } else {
        setCountries((prev) => [...prev, res.data]);
      }

      toast.success("Country added successfully");
    }

    setForm({ name: "" });
    setSuggestions([]);
    setModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
  } catch (error) {
    toast.error("Error saving country");
  }
};


  const handleEditCountry = async (id, newName) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/countries/update/${id}`,
        { name: newName }
      );
      setCountries((prev) =>
        prev.map((c) => (c._id === id ? { ...c, name: newName } : c))
      );
      toast.success("Country updated successfully");
    } catch (error) {
      toast.error("Error updating country");
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}/countries/delete/${id}`
      );
      setCountries((prev) => prev.filter((c) => c._id !== id));
      toast.success("Country deleted successfully");
    } catch (error) {
      toast.error("Error deleting country");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setForm({ name: value });

    if (value.length > 0) {
      const filtered = countryList
        .filter((c) => c.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (country) => {
    setForm({ name: country });
    setSuggestions([]);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen bg-[#D7D9DD] p-8">
      <ToastContainer />
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold">Countries</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full"
        >
          + Country
        </button>
      </div>

      <div className="flex flex-wrap gap-6 max-w-7xl mx-auto">
        {countries.length > 0 ? (
          countries.map((country) => (
            <div
              key={country._id}
              className="bg-[#EFF1F3] rounded-2xl p-6 shadow-md w-64 relative group"
            >
              <Link to={`/dashboard/state/${country.name}/${country._id}`}>
                <h3 className="font-semibold text-lg">{country.name}</h3>
                <div className="text-sm mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-orange-400">
                      ● <span className="text-[#777676]">State</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">
                      ● <span className="text-[#777676]">Districts</span>
                    </span>
                  </div>
                </div>
              </Link>

              <div className="absolute bottom-2 right-2 flex gap-2  transition-opacity">
                <button
                  onClick={() => {
                    setForm({ name: country.name });
                    setIsEditing(true);
                    setEditingId(country._id);
                    setModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this country?"
                      )
                    ) {
                      handleDeleteCountry(country._id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 space-y-4 shadow-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter the Country Name"
                value={form.name}
                onChange={handleInputChange}
                className="border p-2 bg-gray-200 rounded-lg w-full"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {suggestions.map((country, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(country)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="border px-6 py-2 rounded-full"
              >
                Discard
              </button>
              <button
                onClick={handleAddCountry}
                className="bg-black text-white px-6 py-2 rounded-full"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Static country list
const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
"United Arab Emirates",
"United Kingdom",
"United States",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Vatican City",
"Venezuela",
"Vietnam",
"Yemen",
"Zambia",
"Zimbabwe",
];

export default CountryPage;
