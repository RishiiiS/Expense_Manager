import React from 'react';

const Topbar = ({ user }) => {
    return (
        <header className="dashboard-topbar">
            <div className="search-container">
                <span className="search-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="search-input"
                />
            </div>

            <div className="topbar-actions">
                <button className="notification-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    <span className="notification-dot"></span>
                </button>

                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-type">{user.accountType}</span>
                    </div>
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                </div>
            </div>
        </header>
    );
};

export default Topbar;
