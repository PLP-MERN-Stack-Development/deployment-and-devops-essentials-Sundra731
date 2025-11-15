import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="app">
        <Navbar />
        <main className="main-content">
            <Outlet />
        </main>
        <footer className="footer">
            <p>&copy; 2025 MERN Blog. All rights reserved.</p>
        </footer>
        </div>
    );
};

export default Layout;