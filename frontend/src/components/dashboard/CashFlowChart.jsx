import React from 'react';

const CashFlowChart = ({ data }) => {
    return (
        <div className="dashboard-card chart-card">
            <div className="chart-header">
                <div className="chart-title-group">
                    <h3 className="card-title">Cash Flow</h3>
                    <p className="card-subtitle">Income vs Expenses (Jan - Jun)</p>
                </div>

                <div className="chart-actions">
                    <div className="chart-legend">
                        <span className="legend-item"><span className="dot income-dot"></span> Income</span>
                        <span className="legend-item"><span className="dot expense-dot"></span> Expenses</span>
                    </div>
                    <select className="chart-period-select">
                        <option>Last 6 months</option>
                        <option>Last year</option>
                    </select>
                </div>
            </div>

            <div className="chart-container-placeholder">
                {/* 
                    This is a placeholder for a real chart library like Recharts or Chart.js 
                    We are using an SVG to mock the requested visual appearance for now without CSS
                */}
                <svg width="100%" height="250" viewBox="0 0 1000 250" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="1000" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                    {/* Expense Line (Dashed Red) */}
                    <path d="M0 180 Q 200 160, 400 200 T 800 150 Q 900 220, 1000 180" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />

                    {/* Income Line (Solid Yellow) */}
                    <path d="M0 120 Q 200 140, 400 50 T 800 120 Q 900 180, 1000 40" fill="none" stroke="#fbbf24" strokeWidth="3" />
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
