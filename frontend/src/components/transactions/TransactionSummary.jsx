import React from 'react';

const TransactionSummary = ({ summary }) => {
    return (
        <div className="transaction-summary-row">
            <div className="summary-card expenses-card">
                <div className="summary-info">
                    <span className="summary-label">TOTAL EXPENSES</span>
                    <h2 className="summary-amount">${summary.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                    <span className="summary-change negative">{summary.expensesChange}</span>
                </div>
                <div className="summary-icon empty-icon"></div>
            </div>

            <div className="summary-card income-card">
                <div className="summary-info">
                    <span className="summary-label">TOTAL INCOME</span>
                    <h2 className="summary-amount">${summary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                    <span className="summary-change positive">{summary.incomeChange}</span>
                </div>
                <div className="summary-icon empty-icon"></div>
            </div>
        </div>
    );
};
export default TransactionSummary;
