import React from 'react';

const TransactionSummary = ({ summary, onEditExpenses, onEditIncome }) => {
    return (
        <div className="transaction-summary-row">
            <div className="summary-card expenses-card">
                <div className="summary-info">
                    <span className="summary-label">TOTAL EXPENSES</span>
                    <h2 className="summary-amount">₹{summary.totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                    <span className="summary-change negative">{summary.expensesChange}</span>
                </div>
                <button className="summary-icon summary-edit-btn" onClick={onEditExpenses}>
                    Edit
                </button>
            </div>

            <div className="summary-card income-card">
                <div className="summary-info">
                    <span className="summary-label">CURRENT BALANCE</span>
                    <h2 className="summary-amount">₹{(summary.remainingAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                    <span className="summary-change positive">{summary.remainingChange}</span>
                </div>
                <button className="summary-icon summary-edit-btn" onClick={onEditIncome}>
                    Edit
                </button>
            </div>
        </div>
    );
};
export default TransactionSummary;
