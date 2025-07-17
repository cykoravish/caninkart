import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContactForm from "../components/contactForm";
import dog from "../assets/dogb1.png";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/blogs`
        );
        setBlogs(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
      .replace(/(^-|-$)/g, ""); // remove leading/trailing hyphens
  

  return (
    <>
      <div className="bg-[#EDEBE0] py-8 px-10 mt-16 max-w-screen-2xl mx-auto">
        <h2 className="text-center text-xl font-bold mb-6">Our Blog</h2>

       {loading ? (
  <div className="text-center mt-10">
    <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p className="text-gray-500">Loading blogs...</p>
  </div>
) : blogs.length === 0 ? (
  <p className="text-center text-gray-500">No blogs available</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 space-y-1">
    {blogs.map((blog) => (
      <Link to={`/blog/news/${slugify(blog.title)}`} state={blog} key={blog._id}>
        <div className="bg-[#f5f4ef] rounded-xl shadow-lg overflow-hidden border relative border-gray-200">
          <span className="inline-block border border-black bg-gray-50 px-4 py-1 rounded-full text-sm absolute top-2 left-2 font-medium">
            {blog.tags[0] || "Blog"}
          </span>

          <img
            src={`${import.meta.env.VITE_BACKEND}/${blog.image}`}
            alt={blog.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dog;
            }}
            className="w-full h-64 object-center"
          />

          <div className="px-3 pb-3">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Posted on: {new Date(blog.date).toLocaleDateString()}
            </p>
            <h3 className="text-lg tracking-tight leading-snug font-bold text-gray-900 line-clamp-2">
              {blog.title}
            </h3>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}

      </div>

      <ContactForm />
    </>
  );
};

export default Blog;
