import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children, user }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}
            <div className="dashboard-main-content">
                <Topbar user={user} toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
                <main className="dashboard-content-area">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
