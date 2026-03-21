import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentMonthKey, upsertCurrentMonthlyProfile } from '../utils/monthlyProfile';

const SignIn = () => {
    const navigate = useNavigate();

    const handleMonthlySetup = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const totalMonthlyIncome = Number(formData.get('totalMonthlyIncome') || 0);
        const incomeSource = String(formData.get('incomeSource') || '').trim();
        const savingTarget = Number(formData.get('savingTarget') || 0);

        if (!totalMonthlyIncome || !incomeSource || !savingTarget) {
            return;
        }

        upsertCurrentMonthlyProfile({
            totalMonthlyIncome,
            incomeSource,
            savingTarget
        });

        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', 'demo-session-token');
        }

        navigate('/dashboard');
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
                        <h1 className="login-title">Monthly Profile Setup</h1>
                        <p className="login-subtitle">
                            Share your financial details for {getCurrentMonthKey()} to personalize dashboard and analytics
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleMonthlySetup}>
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

                        <button type="submit" className="sign-in-btn-main">Save Monthly Details</button>
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
