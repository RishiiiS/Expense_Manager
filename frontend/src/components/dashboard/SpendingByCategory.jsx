import React from 'react';

const SpendingByCategory = ({ data }) => {
    return (
        <div className="dashboard-card spending-card">
            <div className="card-header-flex">
                <h3 className="card-title">Spending by Category</h3>
                <a href="#report" className="view-report-link">View Report</a>
            </div>

            <div className="spending-content">
                <div className="donut-chart-placeholder">
                    {/* Placeholder for Donut Chart. A simple CSS rounded border will be used later */}
                    <div className="donut-hole">
                        <span className="donut-center-text">Total</span>
                    </div>
                </div>

                <div className="spending-list">
                    {data.map((item, index) => (
                        <div key={index} className="spending-item">
                            <div className="spending-item-header">
                                <div className="category-name">
                                    <span className="category-dot" style={{ backgroundColor: item.color }}></span>
                                    {item.category}
                                </div>
                                <span className="category-percentage">{item.percentage}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                ></div>
                            </div>
                            <div className="category-amount">
                                ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpendingByCategory;
