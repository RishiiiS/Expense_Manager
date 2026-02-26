import React from 'react';

const TotalBalanceCard = ({ balance, change, cardDetails }) => {
    return (
        <div className="dashboard-card balance-card">
            <div className="balance-header">
                <span className="balance-label">TOTAL BALANCE</span>
                <h2 className="balance-amount">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                <div className="balance-change-container">
                    <span className="balance-change positive">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        {change}%
                    </span>
                    <span className="balance-vs-text">vs last month</span>
                </div>
            </div>

            <div className="balance-footer">
                <span className="card-holder-name">{cardDetails.holder}</span>
            </div>
        </div>
    );
};

export default TotalBalanceCard;
