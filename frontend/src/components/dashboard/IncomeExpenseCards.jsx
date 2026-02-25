import React from 'react';

export const IncomeExpenseCards = ({ income, expenses }) => {
    return (
        <div className="income-expense-wrapper">
            <div className="stat-card income-stat">
                <div className="stat-header">
                    <span className="stat-label">Income</span>
                    <span className="stat-icon income-icon">↑</span>
                </div>
                <h3 className="stat-amount">${income.toLocaleString('en-US')}</h3>
                <div className="stat-chart-placeholder income-chart">
                    {/* Placeholder for small sparkline chart */}
                    <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 30 Q 25 10, 50 20 T 100 5" fill="none" stroke="#fbbf24" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            <div className="stat-card expense-stat">
                <div className="stat-header">
                    <span className="stat-label">Expenses</span>
                    <span className="stat-icon expense-icon">↓</span>
                </div>
                <h3 className="stat-amount">${expenses.toLocaleString('en-US')}</h3>
                <div className="stat-chart-placeholder expense-chart">
                    {/* Placeholder for small sparkline chart */}
                    <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 10 Q 25 30, 50 20 T 100 25" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
