import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    // Filter posts whenever search query or category changes
    useEffect(() => {
        filterPosts();
    }, [searchQuery, selectedCategory, posts]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postService.getAllPosts();
            setPosts(response.data);
            setFilteredPosts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            setCategories(response.data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const filterPosts = () => {
        let filtered = [...posts];

        // Filter by search query (title or content)
        if (searchQuery.trim()) {
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(post => 
                post.category._id === selectedCategory
            );
        }

        setFilteredPosts(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setFilteredPosts(posts);
    };

    const hasActiveFilters = searchQuery || selectedCategory;

    if (loading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="home">
            <h1>Blog Posts</h1>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
                <div className="search-filter-container">
                    <div className="search-group">
                        <label htmlFor="search">Search Posts</label>
                        <input
                            type="text"
                            id="search"
                            className="search-input"
                            placeholder="Search by title or content..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="category">Filter by Category</label>
                        <select
                            id="category"
                            className="filter-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="clear-filters-btn"
                        onClick={clearFilters}
                        disabled={!hasActiveFilters}
                    >
                        Clear Filters
                    </button>
                </div>

                {hasActiveFilters && (
                    <div className="search-results-info">
                        Showing {filteredPosts.length} of {posts.length} posts
                    </div>
                )}
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
                <div className="no-results">
                    {hasActiveFilters 
                        ? 'No posts found matching your search criteria. Try adjusting your filters.'
                        : 'No posts found. Create your first post!'}
                </div>
            ) : (
                <div className="posts-grid">
                    {filteredPosts.map((post) => (
                        <div key={post._id} className="post-card">
                            <h2>{post.title}</h2>
                            <p className="excerpt">{post.excerpt}</p>
                            <div className="post-meta">
                                <span>By {post.author.name}</span>
                                <span>{post.category.name}</span>
                            </div>
                            <Link to={`/posts/${post._id}`} className="read-more">
                                Read More →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;