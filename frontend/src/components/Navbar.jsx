import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span className="logo-icon">₹</span> MoneyTree
            </div>
            <ul className="navbar-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#github">GitHub</a></li>
            </ul>
            <div className="navbar-actions">
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/signin" className="sign-in-btn">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;
