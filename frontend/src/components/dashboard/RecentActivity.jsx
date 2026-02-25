import React from 'react';

const RecentActivity = ({ activities }) => {
    return (
        <div className="dashboard-card activity-card">
            <div className="card-header-flex">
                <h3 className="card-title">Recent Activity</h3>
                <a href="#all" className="view-all-link">View All</a>
            </div>

            <div className="activity-list">
                {activities.map(activity => (
                    <div key={activity.id} className="activity-item">
                        <div className="activity-icon-wrapper">
                            <span>{activity.icon}</span>
                        </div>
                        <div className="activity-details">
                            <h4 className="activity-title">{activity.title}</h4>
                            <p className="activity-time">{activity.subtitle}</p>
                        </div>
                        <div className="activity-amount-group">
                            <span className={`activity-amount ${activity.amount > 0 ? 'positive' : 'negative'}`}>
                                {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="activity-type">{activity.type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
