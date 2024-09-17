import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To redirect after login
import "./style.css";

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        setMessage('User logged in.');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // logs out any previously logged user before performing a login
        logout();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('auth-token', res.data.token);
            localStorage.setItem('user-id', res.data.userId);
            localStorage.setItem('username', res.data.username);
            setMessage('Login successful!');
            navigate('/home');
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.msg);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-container-heading">
                <h2>
                    Already have an Account
                </h2>
                <p>Welcome Back</p>
            </div>
            <div className="outer-container">
                <div className="form-outer-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">
                                Username
                            </label>
                            <div className="input-container">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <div className="input-container">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {message && (
                        <div className="message">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
