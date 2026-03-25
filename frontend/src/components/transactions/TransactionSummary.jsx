import React from 'react';

const TransactionSummary = ({ summary, onEditStartingBalance }) => {
    return (
        <div className="transaction-summary-row">
            <div className="summary-card expenses-card">
                <div className="summary-info">
                    <span className="summary-label">TOTAL EXPENSES</span>
                    <h2 className="summary-amount">₹{summary.totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                    <span className="summary-change negative">{summary.expensesChange}</span>
                </div>
            </div>

            <div className="summary-card income-card">
                <div className="summary-info">
                    <span className="summary-label">CURRENT BALANCE</span>
                    <h2 className="summary-amount">₹{(summary.remainingAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                    <span className="summary-label" style={{ marginTop: '0.4rem', color: 'var(--text-main)', display: 'block' }}>
                        Starting Balance: ₹{(summary.startingBalance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })} • Savings: ₹{(summary.totalSavings || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                </div>
                <button className="summary-icon summary-edit-btn" onClick={onEditStartingBalance}>
                    Set Baseline
                </button>
            </div>
        </div>
    );
};
export default TransactionSummary;
