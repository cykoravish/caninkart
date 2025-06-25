import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ContactForm from "../components/contactForm";

const BlogDetailsAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="mt-20 text-center text-gray-600">
        Blog data not available. Please go back and select a blog again.
        <br />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Go Back
        </button>
      </div>
    );
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full mx-auto px-6 sm:px-10 py-8 bg-[#EDEBE0]  max-w-screen-2xl">
        <div className="flex items-center justify-between ">
          {/* Back Button */}
          <div
            onClick={() => navigate(-1)}
            className="inline-flex items-center  text-gray-600 cursor-pointer hover:text-orange-500"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(-1);
            }}
            aria-label="Go back"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </div>

          {/* Meta Info */}
          <p className="text-sm text-gray-500">
            {new Date(data.date).toLocaleDateString()} · By {data.author}
          </p>
        </div>

        {/* Image */}
        {data.image && (
          <div className="max-w-6xl mx-auto mb-6">
            <img
              src={`${import.meta.env.VITE_BACKEND}/${data.image}`}
              alt={data.title}
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{data.title}</h1>
          <div
            className="prose  text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>

    </>
  );
};

export default BlogDetailsAdmin;
