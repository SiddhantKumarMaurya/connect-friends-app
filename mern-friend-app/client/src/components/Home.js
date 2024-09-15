import React from 'react';
import SearchUser from './SearchUser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // Logout function to clear localStorage
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
            <SearchUser />
        </div>
    );
};

export default Home;
