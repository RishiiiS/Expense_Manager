import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, close }) => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('dark');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const handleToggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <aside className={`dashboard-sidebar ${isOpen ? 'mobile-open' : ''}`}>
            <a href="/#about" className="sidebar-logo">
                <span className="logo-icon">₹</span> MoneyTree
            </a>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} end>
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </span>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/analytics" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                            </span>
                            Analytics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/transactions" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                            <span className="nav-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </span>
                            Transactions
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-settings">
                <button className="nav-item settings-trigger" onClick={() => setIsSettingsOpen((prev) => !prev)}>
                    <span className="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4.39 16.96l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.4l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 10 3.28V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 1 1 19.6 7.04l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </span>
                    Settings
                </button>

                {isSettingsOpen && (
                    <div className="settings-menu">
                        <button className="settings-action-btn" onClick={handleToggleTheme}>
                            Change Theme: {theme === 'dark' ? 'Light' : 'Dark'}
                        </button>
                        <button className="settings-action-btn logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
