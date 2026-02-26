import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    return (
        <div className="login-page">
            <header className="login-header">
                <div className="login-logo">
                    <span className="logo-icon">₹</span> MoneyTree
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
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
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
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
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
                            <span className="social-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </span> Google
                        </button>
                        <button type="button" className="social-btn github-btn">
                            <span className="social-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
                                </svg>
                            </span> GitHub
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
