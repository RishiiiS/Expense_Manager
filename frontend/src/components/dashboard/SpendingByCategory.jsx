import React, { useMemo } from 'react';

const SpendingByCategory = ({ data }) => {
    const totalSpending = useMemo(
        () => data.reduce((sum, item) => sum + item.amount, 0),
        [data],
    );

    const donutBackground = useMemo(() => {
        if (!data.length || !totalSpending) {
            return 'radial-gradient(circle, #161922 57%, transparent 58%), conic-gradient(from -90deg, #252c3b 0 100%)';
        }

        let currentStop = 0;
        const stops = data.map((item) => {
            const start = currentStop;
            currentStop += (item.amount / totalSpending) * 100;
            return `${item.color} ${start}% ${currentStop}%`;
        });

        return `radial-gradient(circle, #161922 57%, transparent 58%), conic-gradient(from -90deg, ${stops.join(', ')})`;
    }, [data, totalSpending]);

    return (
        <div className="dashboard-card spending-card">
            <div className="card-header-flex">
                <h3 className="card-title">Spending by Category</h3>
                <a href="#report" className="view-report-link">View Report</a>
            </div>

            <div className="spending-content">
                <div className="donut-wrap">
                    <div className="donut" style={{ background: donutBackground }}>
                        <div className="donut-inner">
                            <span>TOTAL EXP</span>
                            <strong>₹{totalSpending.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>
                        </div>
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
                                ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpendingByCategory;
