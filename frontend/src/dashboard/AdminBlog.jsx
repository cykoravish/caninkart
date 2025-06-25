import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapLink from "@tiptap/extension-link"; // renamed to avoid conflict
import { Link } from "react-router-dom";

const BlogModalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    author: "",
    tags: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("author", formData.author);
    data.append("tags", formData.tags);
    data.append("content", formData.content);
    if (image) data.append("image", image);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/blogs`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog uploaded successfully!");
      setFormData({ title: "", date: "", author: "", tags: "", content: "" });
      setImage(null);
      if (editor) editor.commands.setContent("");
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Failed to upload blog.");
    }
  };

  const handleLink = () => {
    if (!editor) return;
    const selection = editor.state.selection;
    if (selection.empty) {
      alert("Please select some text to apply a link.");
      return;
    }
    const url = prompt("Enter URL (e.g., https://example.com)");
    if (url && url.trim() !== "") {
      editor.chain().focus().setLink({ href: url.trim() }).run();
    } else {
      alert("Invalid URL");
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/blogs`
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="bg-[#D7D9DD] h-screen">
        <div className=" p-3 ">
          <div className="text-right">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
            >
              Upload Blog
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">
                  Upload Blog
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
                >
                  {/* your form fields stay unchanged */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., tech, react, webdev"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Content
                      </label>
                      <div className="mt-1 border border-gray-300 rounded-md">
                        <div className="flex space-x-2 p-2 bg-gray-100">
                          <button
                            type="button"
                            onClick={() =>
                              editor.chain().focus().toggleBold().run()
                            }
                            className={`px-2 py-1 rounded ${
                              editor?.isActive("bold")
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            Bold
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              editor.chain().focus().toggleItalic().run()
                            }
                            className={`px-2 py-1 rounded ${
                              editor?.isActive("italic")
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            Italic
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              editor.chain().focus().toggleBulletList().run()
                            }
                            className={`px-2 py-1 rounded ${
                              editor?.isActive("bulletList")
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            Bullet List
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              editor.chain().focus().toggleOrderedList().run()
                            }
                            className={`px-2 py-1 rounded ${
                              editor?.isActive("orderedList")
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            Numbered List
                          </button>
                          <button
                            type="button"
                            onClick={handleLink}
                            className={`px-2 py-1 rounded ${
                              editor?.isActive("link")
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            Link
                          </button>
                        </div>
                        <EditorContent
                          editor={editor}
                          className="p-4 prose max-w-none min-h-[200px] border-t border-gray-300 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                      Upload Blog
                    </button>
                  </form>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 z-10  ">
          <h2 className="text-3xl font-bold text-center mb-8">Blog Posts</h2>
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link to={`/dashboard/blogdetail/${blog._id}`} state={blog}>
                  <div
                    key={blog._id}
                    className="bg-[#f5f4ef] rounded-xl  shadow-lg overflow-hidden border relative border-gray-200"
                  >
                    <span className="inline-block border border-black bg-gray-50 px-4 py-1 rounded-full text-sm absolute top-2 left-2 font-medium">
                      {blog.tags[0] || "Blog"}
                    </span>
                    {blog.image && (
                      <img
                        src={`${import.meta.env.VITE_BACKEND}/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-64 object-cover"
                      />
                    )}
                    <div className="px-6 pb-6">
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(blog.date).toLocaleDateString()} • By{" "}
                        {blog.author}
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {blog.title.length > 25
                          ? blog.title.substring(0, 25) + "..."
                          : blog.title}
                      </h3>
                      {/* <div
                    className="text-gray-700 text-sm prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + "..." }}
                  /> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogModalPage;
