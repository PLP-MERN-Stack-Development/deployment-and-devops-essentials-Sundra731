// CommentSection.jsx - Component for displaying and adding comments

import { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Get user from localStorage (assuming you store it there after login)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    // Fetch comments when component mounts
    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
        setLoading(true);
        const response = await axios.get(`/api/posts/${postId}/comments`);
        setComments(response.data.data);
        setError('');
        } catch (err) {
        setError('Failed to load comments');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        
        if (!token) {
        setError('Please login to comment');
        return;
        }

        if (!newComment.trim()) {
        setError('Comment cannot be empty');
        return;
        }

        try {
        setSubmitting(true);
        setError('');

        const response = await axios.post(
            `/api/posts/${postId}/comments`,
            { content: newComment },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        // Add new comment to the list
        setComments([...comments, response.data.data]);
        setNewComment('');
        } catch (err) {
        setError(err.response?.data?.error || 'Failed to add comment');
        console.error(err);
        } finally {
        setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
        return;
        }

        try {
        await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        // Remove comment from the list
        setComments(comments.filter((c) => c._id !== commentId));
        } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete comment');
        console.error(err);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        });
    };

    if (loading) {
        return <div className="comments-loading">Loading comments...</div>;
    }

    return (
        <div className="comment-section">
        <h3>Comments ({comments.length})</h3>

        {error && <div className="error-message">{error}</div>}

        {/* Comment Form */}
        {token ? (
            <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
                disabled={submitting}
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Comment'}
            </button>
            </form>
        ) : (
            <p className="login-prompt">Please login to comment</p>
        )}

      {/* Comments List */}
        <div className="comments-list">
            {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
            comments.map((comment) => (
                <div key={comment._id} className="comment">
                <div className="comment-header">
                    <strong>{comment.user?.name || 'Anonymous'}</strong>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
                {user._id === comment.user?._id && (
                    <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="delete-btn"
                    >
                    Delete
                    </button>
                )}
                </div>
            ))
            )}
        </div>
        </div>
    );
};

export default CommentSection;