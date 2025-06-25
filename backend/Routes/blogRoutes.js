const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const blogController = require('../Controllers/blogController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
// router.get('/:id', blogController.getBlogById);

module.exports = router;
