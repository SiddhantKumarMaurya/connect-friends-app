import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To redirect after registration
import "./style.css";

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', interests: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // To store the interests and hobbies
            const interestsArray = formData.interests.split(',').map(interest => interest.trim());
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username: formData.username,
                password: formData.password,
                interests: interestsArray,
            });
            setMessage(res.data?.msg || 'Registration successful!');

             // Redirect to login page after successful registration
            navigate('/login');
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
                <h2>Create a New Account</h2>
                <p>
                    Fill in the details below to create a new account.
                </p>
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
                            <label htmlFor="interests">
                                Hobbies/Interests
                            </label>
                            <div className="input-container">
                                <input
                                    id="interests"
                                    name="interests"
                                    type="text"
                                    placeholder="Interests (comma-separated)"
                                    required
                                    value={formData.interests}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit">
                                Sign Up
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

export default Register;
