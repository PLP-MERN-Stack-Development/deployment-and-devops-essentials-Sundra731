import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/api';
import CommentSection from "../components/CommentSection";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
        setLoading(true);
        const response = await postService.getPost(id);
        setPost(response.data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading post...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="post-detail">
        <Link to="/" className="back-link">← Back to Posts</Link>
        <article>
            <h1>{post.title}</h1>
            <div className="post-meta">
            <span>By {post.author.name}</span>
            <span>Category: {post.category.name}</span>
            <span>Views: {post.viewCount}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="post-content">
            <p>{post.content}</p>
            </div>
            {post.tags && post.tags.length > 0 && (
            <div className="tags">
                {post.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
                ))}
            </div>
            )}
            
            {/* ADD COMMENT SECTION HERE */}
            <CommentSection postId={id} />
            
        </article>
        </div>
    );
};

export default PostDetail;