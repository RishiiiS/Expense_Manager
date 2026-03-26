import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentMonthKey, upsertCurrentMonthlyProfile } from '../utils/monthlyProfile';
import { apiCall } from '../utils/api';

const SignIn = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleMonthlySetup = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const password = String(formData.get('password') || '').trim();
        const totalMonthlyIncome = Number(formData.get('totalMonthlyIncome') || 0);
        const incomeSource = String(formData.get('incomeSource') || '').trim();
        const savingTarget = Number(formData.get('savingTarget') || 0);

        if (!name || !email || !password || !totalMonthlyIncome || !incomeSource || !savingTarget) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        try {
            // First register the user
            await apiCall('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });

            // Then logically log them in to get the token
            const loginResponse = await apiCall('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            localStorage.setItem('token', loginResponse.token);

            // Set up monthly profile 
            upsertCurrentMonthlyProfile({
                totalMonthlyIncome,
                incomeSource,
                savingTarget
            });

            // Also set a budget automatically for the saving target
            const date = new Date();
            await apiCall('/budgets', {
                method: 'POST',
                body: JSON.stringify({
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    monthly_limit: totalMonthlyIncome - savingTarget // Example logic
                })
            }).catch(() => {}); // Ignore budget exist errors

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <div className="login-logo">
                    <span className="logo-icon">₹</span> MoneyTree
                </div>
                <div className="login-header-right">
                    <span className="new-here-text">Already have an account?</span>
                    <Link to="/login" className="create-account-link">Log In</Link>
                </div>
            </header>

            <main className="login-main">
                <div className="login-card">
                    <div className="login-card-header">
                        <h1 className="login-title">Create Account & Setup</h1>
                        <p className="login-subtitle">
                            Create your account and share your financial details for {getCurrentMonthKey()}
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleMonthlySetup}>
                        {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                        
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span>
                                <input type="text" id="name" name="name" placeholder="John Doe" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <input type="email" id="email" name="email" placeholder="john@example.com" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="••••••••" required />
                                <button 
                                    type="button" 
                                    className="password-toggle-btn" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="totalMonthlyIncome">Total Monthly Income</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                </span>
                                <input
                                    type="number"
                                    id="totalMonthlyIncome"
                                    name="totalMonthlyIncome"
                                    placeholder="e.g. 120000"
                                    min="1"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="incomeSource">Income Source</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"></path><path d="M12 3c3.5 3 3.5 15 0 18"></path><path d="M12 3c-3.5 3-3.5 15 0 18"></path></svg>
                                </span>
                                <input
                                    type="text"
                                    id="incomeSource"
                                    name="incomeSource"
                                    placeholder="e.g. Salary, Freelance, Business"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="savingTarget">Saving Target</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M5 9h14"></path></svg>
                                </span>
                                <input
                                    type="number"
                                    id="savingTarget"
                                    name="savingTarget"
                                    placeholder="e.g. 35000"
                                    min="1"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="sign-in-btn-main" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
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

export default SignIn;
