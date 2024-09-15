import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To redirect after login


const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Logout function to clear localStorage
    const logout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        setMessage('User logged out.');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Log out the previous user before logging in a new one
        logout();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('auth-token', res.data.token);
            localStorage.setItem('user-id', res.data.userId); // Store user ID
            setMessage('Login successful!');
            navigate('/home'); // Redirect to the home page after login
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.msg);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
