const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');

const commentRoutes = require('./comments');

// Routes
router.route('/').get(getAllPosts).post(createPost);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

router.use('/:id/comments', commentRoutes);

module.exports = router;