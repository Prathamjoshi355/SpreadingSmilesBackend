import Blog from '../models/Blog.js';

// @desc    Create blog
// @route   POST /api/blog
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, author } = req.body;

    // Get image from Multer
    const coverImage = req.file ? req.file.path : null;

    if (!title || !content || !coverImage) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const blog = await Blog.create({
      title,
      content,
      coverImage,
      excerpt,
      author: author || 'NGO'
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get blog by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, author } = req.body;

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Update with new image if provided
    const updateData = {
      title,
      content,
      excerpt,
      author
    };

    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
