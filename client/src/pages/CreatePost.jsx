import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService, categoryService, authService } from '../services/api';

const CreatePost = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        isPublished: true,
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
        const response = await categoryService.getAllCategories();
        setCategories(response.data);
        } catch (err) {
        console.error('Error fetching categories:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
        const user = authService.getCurrentUser();
        if (!user) {
            setError('You must be logged in to create a post');
            return;
        }

        const postData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            author: user._id,
        };

        await postService.createPost(postData);
        navigate('/');
        } catch (err) {
        setError(err.response?.data?.error || 'Failed to create post');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="create-post">
        <h1>Create New Post</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={100}
            />
            </div>

            <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <input
                type="text"
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                maxLength={200}
            />
            </div>

            <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
        >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                    {cat.name}
                </option>
                ))}
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={10}
            />
            </div>

            <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. javascript, react, tutorial"
            />
            </div>

            <div className="form-group checkbox">
            <label>
                <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                />
                Publish immediately
            </label>
            </div>

            <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
            </button>
        </form>
        </div>
    );
};

export default CreatePost;