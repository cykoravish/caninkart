import { FiPhone, FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 pt-10 text-sm bg-white max-w-screen-2xl mx-auto">
      <div className="grid gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3 border-b px-10 py-5 max-w-[1500px] mx-auto ">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left ">
          <img src={logo1} alt="Caninkart" className="w-24 h-auto mb-3" />
          <p className=" leading-relaxed max-w-xs text-base">
            Caninkart is a highly reputable manufacturer and exporter of pet
            accessories.
          </p>
        </div>

        {/* Quick Links & Legal */}
        <div className="flex justify-around flex-wrap gap-6 md:gap-0 ">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2 text-black text-lg">
              Quick Links
            </h4>
            <ul className="space-y-1  overflow-auto h-22 custom-scrollbar">
              {["Home", "About", "Product", "Dog Breed", "Market Place"].map(
                (text, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/${
                        text === "Home"
                          ? ""
                          : text.toLowerCase().replace(/\s+/g, "")
                      }`}
                      className="hover:text-orange-500 text-base"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-2 text-black text-lg">Legal</h4>
            <ul className="space-y-1 ">
              {["Terms & Conditions", "Privacy Policy"].map((text, idx) => (
                <li key={idx} className="hover:text-orange-500 text-base">
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start ">
          <h4 className="font-semibold mb-2 text-black text-lg">Contact Us</h4>

          {/* Email */}
          <div className="flex items-center  gap-2 mb-3 ">
            <div className="w-8 h-8  flex items-center justify-center rounded-full bg-[#FDDF82]">
              <FiMail className="text-base md:text-lg" />
            </div>
            <span className="hover:text-orange-400 text-base break-all ">
              <a href="mailto:support@caninkart.com">support@caninkart.com</a>
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 ">
            <div className="w-8 h-8  flex items-center justify-center rounded-full bg-[#FDDF82]">
              <FiPhone className="text-base md:text-lg" />
            </div>
            <span className="hover:text-orange-400 text-base">
              +91-95209 57250
            </span>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-4 flex justify-center gap-4 flex-wrap text-xl">
        {[
          {
            icon: <FaFacebookF />,
            label: "Facebook",
            link: "https://www.facebook.com/caninkart/",
          },
          {
            icon: <FaInstagram />,
            label: "Instagram",
            link: "https://www.instagram.com/caninkart",
          },
          // { icon: <FaYoutube />, label: "YouTube" },
          // { icon: <FaXTwitter />, label: "X (Twitter)" },
        ].map((item, idx) => {
          const content = (
            <div
              aria-label={item.label}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FDDF82] 
          transition-transform duration-300 ease-in-out cursor-pointer 
          hover:scale-110 hover:rotate-12"
            >
              {item.icon}
            </div>
          );

          return item.link ? (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              {content}
            </a>
          ) : (
            <div key={idx}>{content}</div>
          );
        })}
      </div>

      {/* Copyright */}
      <p className="mt-3 text-center text-xs text-gray-500 mb-2">
        <span className="text-base">
          {" "}
          © 2025 Caninkart , All Right Reserved. Powered By{" "}
        </span>

        <span className="text-blue-500 text-base font-semibold ml-2">
          <a href="https://novanectar.co.in/">Novanecter Services PVT. LTD.</a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
