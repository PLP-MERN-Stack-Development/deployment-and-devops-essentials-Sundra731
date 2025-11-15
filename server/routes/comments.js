// comments.js - Routes for comment operations

const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getComments,
    addComment,
    deleteComment,
} = require('../controllers/commentController');

const { protect } = require('../middleware/auth');

// Routes
router.route('/')
  .get(getComments)           // GET /api/posts/:id/comments
  .post(protect, addComment); // POST /api/posts/:id/comments (protected)

router.route('/:commentId')
  .delete(protect, deleteComment); // DELETE /api/posts/:id/comments/:commentId (protected)

module.exports = router;