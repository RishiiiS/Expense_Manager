import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentMonthKey, upsertCurrentMonthlyProfile } from '../utils/monthlyProfile';
import { apiCall } from '../utils/api';

const SignIn = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
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
                                <input type="text" id="name" name="name" placeholder="John Doe" required style={{ paddingLeft: '1rem' }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <input type="email" id="email" name="email" placeholder="john@example.com" required style={{ paddingLeft: '1rem' }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <input type="password" id="password" name="password" placeholder="••••••••" required style={{ paddingLeft: '1rem' }} />
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
