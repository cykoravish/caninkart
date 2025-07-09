import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Cookie = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-lg font-semibold text-gray-800">
       <p className="text-sm text-gray-800">
  We use cookies to personalize content and ads, provide social media features,  
  and analyze our traffic. By continuing to use our site, you consent to our use of cookies.  
  Click "Accept" to agree or "Reject" to disable non-essential cookies.{" "}
  <a  onClick={()=>navigate('/cookie')} className="cursor-pointer underline text-blue-600 hover:text-blue-800">Learn more</a>.
</p>
       
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleReject}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Cookie;
