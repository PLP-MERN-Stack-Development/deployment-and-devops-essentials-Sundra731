import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (token) {
            // Store token
            localStorage.setItem('token', token);
            
            // Fetch user data
            axios.get('http://localhost:5000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // Store user data
                localStorage.setItem('user', JSON.stringify(response.data.data));
                
                // Redirect to home
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 500);
            })
            .catch(err => {
                console.error('Failed to fetch user data:', err);
                setError('Authentication failed. Redirecting to login...');
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            });
        } else {
            // No token, redirect to login
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div style={{ 
            textAlign: 'center', 
            marginTop: '50px',
            padding: '20px'
        }}>
            {error ? (
                <>
                    <h2 style={{ color: '#e74c3c' }}>⚠️ {error}</h2>
                </>
            ) : (
                <>
                    <h2>✅ Authenticating...</h2>
                    <p>Please wait while we log you in with Google.</p>
                </>
            )}
        </div>
    );
};

export default GoogleAuthSuccess;