import React from 'react';

const CashFlowChart = ({ data }) => {
    const generatePoints = (dataset, maxValue) => {
        if (!dataset || dataset.length === 0) return "M0 200 L1000 200";
        const width = 1000;
        const xStep = width / (dataset.length - 1);
        
        let path = "";
        dataset.forEach((val, i) => {
            const x = i * xStep;
            // Pad by 20px so top doesn't touch, map to 0-180 range out of 250 viewbox height. Bottom is 220.
            const y = maxValue === 0 ? 220 : 220 - ((val / maxValue) * 160);
            
            if (i === 0) {
                path += `M${x} ${y} `;
            } else {
                path += `L${x} ${y} `;
            }
        });
        return path;
    };

    const maxVal = Math.max(...(data.incomeData || []), ...(data.expenseData || []), 1);
    const incomePath = generatePoints(data.incomeData || [], maxVal);
    const expensePath = generatePoints(data.expenseData || [], maxVal);

    return (
        <div className="dashboard-card chart-card">
            <div className="chart-header">
                <div className="chart-title-group">
                    <h3 className="card-title">Cash Flow</h3>
                    <p className="card-subtitle">Income vs Expenses</p>
                </div>

                <div className="chart-actions">
                    <div className="chart-legend">
                        <span className="legend-item"><span className="dot income-dot"></span> Income</span>
                        <span className="legend-item"><span className="dot expense-dot"></span> Expenses</span>
                    </div>
                    <select className="chart-period-select">
                        <option>Last 6 months</option>
                    </select>
                </div>
            </div>

            <div className="chart-container-placeholder">
                <svg width="100%" height="250" viewBox="0 0 1000 250" preserveAspectRatio="none">
                    <line x1="0" y1="50" x2="1000" y2="50" stroke="var(--border-alpha-05)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="var(--border-alpha-05)" strokeWidth="1" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="var(--border-alpha-05)" strokeWidth="1" />
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="var(--border-alpha-05)" strokeWidth="1" />

                    <path d={expensePath} fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
                    <path d={incomePath} fill="none" stroke="#fbbf24" strokeWidth="3" />
                </svg>
            </div>

            <div className="chart-x-axis">
                {data.months.map(month => (
                    <span key={month}>{month}</span>
                ))}
            </div>
        </div>
    );
};

export default CashFlowChart;
