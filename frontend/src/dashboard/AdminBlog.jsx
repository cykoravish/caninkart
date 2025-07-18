// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Superscript from "@tiptap/extension-superscript";
// import Subscript from "@tiptap/extension-subscript";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import LinkExtension from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import Placeholder from "@tiptap/extension-placeholder";
// import CustomMenuBar from "../components/Menu/CustomMenuBar";
// import { Link } from "react-router-dom";

// const BlogModalPage = () => {
//    const getTodayDate = () => {
//   return new Date().toISOString().split('T')[0];
//   };
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     date: getTodayDate(),
//     author: "",
//     tags: "",
//     content: "",
//   });
//   const [image, setImage] = useState(null);
//   const [blogs, setBlogs] = useState([]);

//   const [imagePreview, setImagePreview] = useState(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Superscript,
//       Subscript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       LinkExtension.configure({ openOnClick: false }),
//       Image,
//       Placeholder.configure({ placeholder: "Start writing your post here..." }),
//     ],
//     content: "",
//     onUpdate: ({ editor }) => {
//       setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
//     },
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setImagePreview(null);
//     document.getElementById("fileUpload").value = "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("date", formData.date);
//     data.append("author", formData.author);
//     data.append("tags", formData.tags);
//     data.append("content", formData.content);
//     if (image) data.append("image", image);

//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND}/api/blogs`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Blog uploaded!");
//       setShowModal(false);
//       setFormData({ title: "", date: "", author: "", tags: "", content: "" });
//       setImage(null);
//       setImagePreview(null);
//       if (editor) editor.commands.setContent("");
//       fetchBlogs(); // Refresh blog list
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert("Failed to upload blog.");
//     }
//   };

//   // Fetch blogs from the backend

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs`);
//       setBlogs(res.data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//   setFormData((prev) => ({
//     ...prev,
//     date: getTodayDate(),
//   }));
// }, []);

//   return (
//     <div className="bg-[#D7D9DD] min-h-screen">
//       <div className="p-3">
//         <div className="text-right">
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-black text-white px-4 py-2 rounded cursor-pointer"
//           >
//             Upload Blog
//           </button>
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
//               >
//                 &times;
//               </button>

//               <h2 className="text-2xl font-bold mb-6 text-center">Upload Blog</h2>
//               <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Title"
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//                 <div className="flex gap-4">
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, date: e.target.value })
//                     }
//                     className="w-1/2 p-2 border rounded"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="author"
//                     value={formData.author}
//                     onChange={handleChange}
//                     placeholder="Author"
//                     className="w-1/2 p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   placeholder="Tags (comma-separated)"
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="fileUpload"
//                   onChange={handleImageChange}
//                   className="w-full border rounded p-2"
//                 />
//                 {imagePreview && (
//                   <div className="relative mt-2">
//                     <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover border" />
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 )}
//                 <div className="border rounded p-2">
//                   <CustomMenuBar editor={editor} />
//                   <EditorContent editor={editor} className="prose max-w-none min-h-[150px]" />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white p-2 rounded "
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 z-10">
//         <h2 className="text-3xl font-bold text-center mb-8">Blog Posts</h2>
//         {blogs.length === 0 ? (
//           <p className="text-center text-gray-500">No blogs available</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogs.map((blog) => (
//               <Link
//                 to={`/dashboard/blogdetail/${blog._id}`}
//                 state={blog}
//                 key={blog._id}
//               >
//                 <div className="bg-[#f5f4ef] rounded-xl shadow-lg overflow-hidden border relative border-gray-200">
//                   <span className="inline-block border border-black bg-gray-50 px-4 py-1 rounded-full text-sm absolute top-2 left-2 font-medium">
//                     {blog.tags[0] || "Blog"}
//                   </span>

//                   {blog.image && (
//                     <img
//                       src={`${import.meta.env.VITE_BACKEND}/${blog.image.replace(/\\/g, '/')}`}
//                       alt={blog.title}
//                       className="w-full h-64 object-cover"
//                     />
//                   )}
//                   <div className="px-6 pb-6">
//                     <p className="text-sm text-gray-600 mb-1">
//                       {new Date(blog.date).toLocaleDateString()} • By {blog.author}
//                     </p>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                       {blog.title.length > 25
//                         ? blog.title.substring(0, 25) + "..."
//                         : blog.title}
//                     </h3>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogModalPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CustomMenuBar from "../components/Menu/CustomMenuBar";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogModalPage = () => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    date: getTodayDate(),
    author: "",
    tags: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start writing your post here..." }),
    ],
    content: "",
    onUpdate: ({ editor }) =>
      setFormData((prev) => ({ ...prev, content: editor.getHTML() })),
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("fileUpload").value = "";
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: getTodayDate(),
      author: "",
      tags: "",
      content: "",
    });
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingBlogId(null);
    if (editor) editor.commands.setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND}/api/blogs/blogs/${editingBlogId}`,
          data
        );
        toast.success("Blog updated!");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND}/api/blogs`, data);
        toast.success("Blog uploaded!");
      }
      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload blog.");
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs`);
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/blogs/blogs/${id}`
      );
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

 const handleEdit = (blog) => {
  setFormData({
    title: blog.title,
    date: blog.date ? blog.date.split("T")[0] : getTodayDate(), 
    author: blog.author,
    tags: blog.tags.join(", "),
    content: blog.content,
    
  });

  // Safe image preview setup
  setImagePreview(
    blog.image
      ? `${import.meta.env.VITE_BACKEND}/${blog.image.replace(/\\/g, "/")}`
      : null
  );

  setEditingBlogId(blog._id);
  setIsEditing(true);
  setShowModal(true);

  if (editor) editor.commands.setContent(blog.content || "");
};


  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#D7D9DD] min-h-screen">
      <div className="p-3 text-right">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload Blog
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEditing ? "Edit Blog" : "Upload Blog"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
            >
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author"
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma-separated)"
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                onChange={handleImageChange}
                className="w-full border rounded p-2"
              />
              {imagePreview && (
                <div className="relative mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
              <div className="border rounded p-2">
                <CustomMenuBar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="prose max-w-none min-h-[150px]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded"
              >
                {isEditing ? "Update Blog" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Blog Posts</h2>
       {loading ? (
  <div className="flex justify-center items-center h-64">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
) : blogs.length === 0 ? (
  <p className="text-center text-gray-500">No blogs available</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {blogs.map((blog) => (
      <div
        key={blog._id}
        className="bg-[#f5f4ef] rounded-xl shadow-lg overflow-hidden border relative border-gray-200"
      >
        <Link
          to={`/dashboard/blogdetail/${blog._id}`}
          state={blog}
          className="block hover:shadow-xl transition-all"
        >
          <span className="inline-block border border-black bg-gray-50 px-4 py-1 rounded-full text-sm absolute top-2 left-2 font-medium">
            {blog.tags[0] || "Blog"}
          </span>
          {blog.image && (
            <img
              src={`${import.meta.env.VITE_BACKEND}/${blog.image.replace(/\\/g, "/")}`}
              alt={blog.title}
              className="w-full h-64 object-center"
            />
          )}
        </Link>

        <div className="flex justify-center items-center">
          <div className="px-2 pt-2">
            <p className="text-sm text-gray-600 mb-1">
              Posted on: {new Date(blog.date).toLocaleDateString()} • By {blog.author}
            </p>
            <h3 className="text-md font-semibold text-gray-900 line-clamp-2">
              {blog.title}
            </h3>
          </div>
          <div className="flex flex-col justify-end items-center my-auto h-full gap-2 px-6">
            <button
              onClick={() => handleEdit(blog)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit Blog"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Blog"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
      <ToastContainer/>
    </div>
  );
};

export default BlogModalPage;
