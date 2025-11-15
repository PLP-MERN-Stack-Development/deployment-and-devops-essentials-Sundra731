// commentController.js - Controller for comment operations

const Post = require('../models/Post');

// @desc    Get all comments for a post
// @route   GET /api/posts/:id/comments
// @access  Public
exports.getComments = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        .select('comments')
        .populate('comments.user', 'name email');

        if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found',
        });
        }

        res.json({
        success: true,
        count: post.comments.length,
        data: post.comments,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private (requires authentication)
exports.addComment = async (req, res, next) => {
    try {
        const { content } = req.body;

        if (!content || content.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Comment content is required',
        });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found',
        });
    }

        // Add comment using the model method
        await post.addComment(req.user._id, content);

        // Populate the newly added comment
        await post.populate('comments.user', 'name email');

        res.status(201).json({
        success: true,
        data: post.comments[post.comments.length - 1],
        message: 'Comment added successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a comment
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private (user must own the comment)
exports.deleteComment = async (req, res, next) => {
    try {
        const { id, commentId } = req.params;

        const post = await Post.findById(id);

        if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found',
        });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
        return res.status(404).json({
            success: false,
            error: 'Comment not found',
        });
    }

        // Check if user owns the comment
        if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            error: 'Not authorized to delete this comment',
        });
        }

        comment.deleteOne();
        await post.save();

        res.json({
        success: true,
        data: {},
        message: 'Comment deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};