import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
        <div className="nav-container">
            <Link to="/" className="nav-logo">
            MERN Blog
            </Link>
            <ul className="nav-menu">
            <li className="nav-item">
                <Link to="/" className="nav-link">
                Home
                </Link>
            </li>
            {user ? (
                <>
                <li className="nav-item">
                    <Link to="/create-post" className="nav-link">
                    Create Post
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-user">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link btn-logout">
                    Logout
                    </button>
                </li>
                </>
            ) : (
                <>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                    Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                    Register
                    </Link>
                </li>
                </>
            )}
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;