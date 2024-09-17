import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();
// // Logout function to clear localStorage
const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('username');
    // navigate('/login'); // Redirect to login page
};

function Navigation() {
    const location = useLocation(); // Use useLocation inside a child component
    const isUsernamePresent = !!localStorage.getItem('username'); // check if 'username' is in localStorage
    return (
        <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="w-full">
                <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
                    <Link
                        to="/register"
                        className={`px-5 py-1.5 text-xs font-medium rounded-lg ${
                            location.pathname === '/register'
                                ? 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900'
                                : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                        }`}
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className={`px-5 py-1.5 text-xs font-medium rounded-lg ${
                            location.pathname === '/login'
                                ? 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900'
                                : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                        }`}
                        onClick={handleLogout}
                    >
                        Login
                    </Link>
                    <Link
                        to="/home"
                        className={`px-5 py-1.5 text-xs font-medium rounded-lg ${
                            location.pathname === '/home'
                                ? 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900'
                                : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                        }`}
                        onClick={(e) => {
                            if (!isUsernamePresent) {
                                e.preventDefault(); // Prevent navigation if username is not present
                            }
                        }}
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/register" />}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
                <Navigation /> {/* Move Navigation into Router context */}
            </div>
        </Router>
    );
}

export default App;

