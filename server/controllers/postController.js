// postController.js - Controller for post-related operations

const Post = require('../models/Post');
const Category = require('../models/Category');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getAllPosts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;
        
        // Build query
        let query = {};
        
        if (category) {
        query.category = category;
    }
    
        if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
        ];
        }
        
        const posts = await Post.find(query)
        .populate('category', 'name slug')
        .populate('author', 'name email')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    
    const count = await Post.countDocuments(query);
    
        res.json({
        success: true,
        count: posts.length,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: posts,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate('category', 'name slug')
        .populate('author', 'name email')
        .populate('comments.user', 'name email');
    
        if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found',
        });
        }
        
        // Increment view count
        await post.incrementViewCount();
        
        res.json({
        success: true,
        data: post,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
    try {
        // Add author from authenticated user (we'll implement auth later)
        req.body.author = req.user?._id || req.body.author;
        
        const post = await Post.create(req.body);
        
        res.status(201).json({
        success: true,
        data: post,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    
        if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found',
        });
        }
        
        res.json({
        success: true,
        data: post,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        
        if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found',
        });
        }
        
        res.json({
        success: true,
        data: {},
        message: 'Post deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};