import React, { useEffect, useState } from "react";
import dog from "../assets/ctf.png";
import { FaPaw } from "react-icons/fa";
import axios from "axios";

const ContactForm = () => {
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdOrLarger(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const bgStyle = isMdOrLarger
    ? {
        backgroundImage: `url(${dog})`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundImage: "none" };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
   const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone); // 10 digits only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Validation
    if (!validatePhone(formData.contact)) {
      setErrorMsg("Please enter a valid 10-digit contact number.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/cnt/contact`,
        formData
      );
      setSuccessMsg("Message sent successfully!");
      setFormData({ name: "", contact: "", email: "", message: "" });
    } catch (error) {
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-10 px-4 bg-[#FDFDFD] text-center max-w-screen-2xl mx-auto">
      <h2 className=" text-orange-500 mb-2 flex justify-center items-center gap-2 text-lg font-semibold"><FaPaw/> CONTACT</h2>
      <h3 className="text-lg font-bold mb-0 md:mb-6">Contact Us</h3>

      <div
        className="relative w-full  md:py-20 px-4 rounded-2xl min-h-[400px] md:min-h-[500px]"
        style={bgStyle}
      >
        {isMdOrLarger && (
          <div className="absolute inset-0  rounded-2xl z-0"></div>
        )}

        <div className="relative max-w-7xl mx-auto flex justify-center md:justify-end z-10">
          <form
            className="bg-[#F0F2F3] p-6 rounded shadow-md w-full max-w-sm text-left space-y-3 text-black"
            onSubmit={handleSubmit}
          >
            <h3 className="font-bold text-lg">Do You Have Any Questions?</h3>

            {successMsg && <p className="text-green-600">{successMsg}</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <input
              className="w-full p-2 rounded bg-white"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              className="w-full p-2 rounded bg-white"
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Your Contact"
              required
            />
            <input
              className="w-full p-2 rounded bg-white"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            <textarea
              className="w-full p-2 rounded bg-white"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="3"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#BC5E38] text-white py-2 rounded hover:bg-orange-600 transition"
            >
              {loading ? "Sending..." : "SEND"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
