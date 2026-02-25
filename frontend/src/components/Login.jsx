import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="login-page">
            <header className="login-header">
                <div className="login-logo">
                    <span className="logo-icon">$</span> MoneyTree
                </div>
                <div className="login-header-right">
                    <span className="new-here-text">New here?</span>
                    <Link to="/register" className="create-account-link">Create an account</Link>
                </div>
            </header>

            <main className="login-main">
                <div className="login-card">
                    <div className="login-card-header">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Enter your credentials to access your finance dashboard</p>
                    </div>

                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">@</span>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="student@university.edu"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="password-header">
                                <label htmlFor="password">Password</label>
                                <a href="#forgot" className="forgot-password-link">Forgot Password?</a>
                            </div>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="sign-in-btn-main">Sign In</button>
                    </form>

                    <div className="auth-divider">
                        <span>OR CONTINUE WITH</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn google-btn">
                            <span className="social-icon">G</span> Google
                        </button>
                        <button type="button" className="social-btn github-btn">
                            <span className="social-icon">Gh</span> GitHub
                        </button>
                    </div>
                </div>
            </main>

            <footer className="login-footer">
                <div className="login-footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#support">Contact Support</a>
                </div>
                <div className="login-copyright">
                    &copy; 2024 MoneyTree Finance Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Login;
