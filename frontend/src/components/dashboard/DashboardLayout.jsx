import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children, user }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-main-content">
                <Topbar user={user} />
                <main className="dashboard-content-area">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
