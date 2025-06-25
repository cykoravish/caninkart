const Blog = require('../Models/Blog');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, date, author, tags, content } = req.body;
    const blog = new Blog({
      title,
      date,
      author,
      tags: tags.split(',').map(tag => tag.trim()),
      content,
      image: req.file ? req.file.path : null,
    });
    await blog.save();
    res.status(201).json({ message: 'Blog uploaded successfully', blog });
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ message: 'Failed to upload blog', error: error.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};
