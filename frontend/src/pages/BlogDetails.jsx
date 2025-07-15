
import React, { use, useEffect,useState  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ContactForm from "../components/contactForm";
import { useParams } from "react-router-dom";
import axios from "axios";
const BlogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { id } = useParams();
  console.log("Blog ID:", id);
  const [blog, setBlog] = useState(null);
  console.log("Blog Details Data:", blog);
  
 useEffect(() => {
  const fetchdata = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs`);
      console.log("Fetched Blogs:", res.data);
      const blogData = res.data.find((blog) => blog._id === id);
      setBlog(blogData);
      console.log("Fetched Blog Data:", blogData);
    } catch (e) {
      console.error("Error in BlogDetails fetchdata:", e);
    }
  };

  if (id) {
    fetchdata();
  }
}, [id]);

  if (!blog) {
    return (
      <div className="mt-20 text-center text-gray-600">
       loading...
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




 


  return (
    <>
       <div className="w-full mx-auto px-6 sm:px-10 mt-18 bg-[#EDEBE0]  max-w-screen-2xl">
             <div className="flex items-center justify-between pt-4 ">
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
                 {new Date(blog.date).toLocaleDateString()} · By {blog.author}
               </p>
             </div>
     
           
    {blog.image && (
      <div className="max-w-6xl mx-auto mb-6">
        <img
          src={`${import.meta.env.VITE_BACKEND}/${blog.image}`}
          alt={blog.title}
          className="w-full max-h-[500px] object-contain rounded-lg"
        />
      </div>
    )}

    {/* Blog Content */}
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{blog.title}</h1>
      <div
        className="prose text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  </div>


          
     

      <ContactForm />
    </>
  );
};

export default BlogDetails;
