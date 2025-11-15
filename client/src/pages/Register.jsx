import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
        }

        try {
        const { confirmPassword, ...registerData } = formData;
        await authService.register(registerData);
        navigate('/');
        window.location.reload(); // Reload to update auth state
        } catch (err) {
        setError(err.response?.data?.error || 'Registration failed');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-page">
        <div className="auth-container">
            <h1>Register</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            </form>
            <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
        </div>
    );
};

export default Register;