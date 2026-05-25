import Blog from '../models/Blog.js';

const blogDomains = new Set([
  'healthcare',
  'animal-welfare',
  'education',
  'awareness',
  'elderly-care',
  'environment',
  'child-welfare'
]);

const parseDomains = (input) => {
  let values = input;

  if (typeof values === 'string') {
    try {
      values = JSON.parse(values);
    } catch {
      values = [values];
    }
  }

  if (!Array.isArray(values)) return [];

  return [...new Set(values.map((value) => String(value).trim()).filter((value) => blogDomains.has(value)))];
};

// @desc    Create blog
// @route   POST /api/blog
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, author } = req.body;
    const domains = parseDomains(req.body.domains);

    // Get image from Multer
    const coverImage = req.file ? req.file.path : null;

    if (!title || !content || !coverImage || domains.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const blog = await Blog.create({
      title,
      content,
      coverImage,
      excerpt,
      author: author || 'NGO',
      domains
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
    const domain = typeof req.query.domain === 'string' && blogDomains.has(req.query.domain)
      ? req.query.domain
      : null;
    const blogs = await Blog.find(domain ? { domains: domain } : {}).sort({ createdAt: -1 });

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
    const domains = parseDomains(req.body.domains);

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Update with new image if provided
    const updateData = {};

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (typeof excerpt === 'string') updateData.excerpt = excerpt;
    if (author) updateData.author = author;

    if (Object.hasOwn(req.body, 'domains')) {
      if (domains.length === 0) {
        return res.status(400).json({ success: false, message: 'Please select at least one blog domain' });
      }
      updateData.domains = domains;
    }

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
