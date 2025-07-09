import { FaWhatsapp } from "react-icons/fa6";

const Socialicon = () => {
  return (
    <a
      href="https://wa.me/919520957250" // Replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-2 z-50"
      
    >
      <div
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out" 
       style={{ boxShadow: "0px 0px 15px 8px rgba(144, 238, 144, 0.8)" }}
      >
        <FaWhatsapp size={44} />
      </div>
    </a>
  );
};

export default Socialicon;
