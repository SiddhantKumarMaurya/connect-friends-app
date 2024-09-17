import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

// Logout function to clear localStorage
const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('username');
};

function Navigation() {
    const location = useLocation(); 
    const isUsernamePresent = !!localStorage.getItem('username'); // check if 'username' is in localStorage
    return (
        <div className="navigation-container">
            <div className="navigation-container-inner">
                <div className="navigation-bar" role="group">
                    <Link
                        to="/register"
                        className={`link-state-one ${
                            location.pathname === '/register'
                                ? 'link-state-two'
                                : 'link-state-three'
                        }`}
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className={`link-state-one ${
                            location.pathname === '/login'
                                ? 'link-state-two'
                                : 'link-state-three'
                        }`}
                        onClick={handleLogout}
                    >
                        Login
                    </Link>
                    <Link
                        to="/home"
                        className={`link-state-one ${
                            location.pathname === '/home'
                                ? 'link-state-two'
                                : 'link-state-three'
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

