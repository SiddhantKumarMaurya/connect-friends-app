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
        setMessage('User logged in.');
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
            localStorage.setItem('username', res.data.username); // Store username to display on the home page
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
        <>
        {/* <div>
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
        </div> */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Already have an Account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    User Name
                </label>
                <div className="mt-2">
                    <input
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                   Login
                </button>
                </div>
            </form>
            {message && <p>{message}</p>} */}

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input 
                type="text" 
                name="username" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Username"
                value={formData.username} 
                onChange={handleChange}
                required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                 name="password" 
                 type="password"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                 required
                 placeholder="Password"
                 value={formData.password} 
                 onChange={handleChange}/>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
            </button>
            </form>
            {message && <p>{message}</p>}

            </div>
        </div>
        </>
    );
};

export default Login;
