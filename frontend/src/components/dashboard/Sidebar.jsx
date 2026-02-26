import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-logo">
                <span className="logo-icon">$</span> MoneyTree
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li>
                        <NavLink to="/dashboard" className="nav-item active" end>
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </span>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <a href="#analytics" className="nav-item">
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                            </span>
                            Analytics
                        </a>
                    </li>
                    <li>
                        <NavLink to="/transactions" className="nav-item">
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </span>
                            Transactions
                        </NavLink>
                    </li>
                    <li>
                        <a href="#wallets" className="nav-item">
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            </span>
                            Wallets
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-promo">
                <div className="promo-card">
                    <div className="promo-header">
                        <h4>Upgrade to Pro</h4>
                        <span className="promo-badge">NEW</span>
                    </div>
                    <p className="promo-text">Get advanced AI insights and unlimited wallet connections.</p>
                    <button className="promo-btn">View Plans</button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
