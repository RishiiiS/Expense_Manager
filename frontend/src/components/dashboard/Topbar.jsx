import React from 'react';

const Topbar = ({ user, toggleSidebar }) => {
    return (
        <header className="dashboard-topbar">
            <div className="topbar-left">
                <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
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
            </div>

            <div className="topbar-actions">
                <button className="notification-btn" aria-label="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 17H9"></path>
                        <path d="M18 17V11C18 7.69 15.31 5 12 5C8.69 5 6 7.69 6 11V17L4 19H20L18 17Z"></path>
                    </svg>
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
