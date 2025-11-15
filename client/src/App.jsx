import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import './App.css';

// Code splitting with React.lazy for better performance
const Home = lazy(() => import('./pages/Home'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const GoogleAuthSuccess = lazy(() => import('./pages/GoogleAuthSuccess'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="auth/google/success" element={<GoogleAuthSuccess />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;