import React from 'react';
import DashboardLayout from './DashboardLayout';
import TotalBalanceCard from './TotalBalanceCard';
import { IncomeExpenseCards } from './IncomeExpenseCards';
import CashFlowChart from './CashFlowChart';
import SpendingByCategory from './SpendingByCategory';
import RecentActivity from './RecentActivity';
import { mockDashboardData as data } from '../../data/mockData';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <DashboardLayout user={data.user}>
            <div className="dashboard-grid">

                {/* Left Column */}
                <div className="dashboard-col-left">
                    <TotalBalanceCard
                        balance={data.totalBalance}
                        change={data.balanceChange}
                        cardDetails={data.cardDetails}
                    />
                    <IncomeExpenseCards
                        income={data.income}
                        expenses={data.expenses}
                    />
                </div>

                {/* Right Column Top */}
                <div className="dashboard-col-right-top">
                    <CashFlowChart data={data.cashFlow} />
                </div>

                {/* Bottom Row */}
                <div className="dashboard-bottom-row">
                    <SpendingByCategory data={data.spendingByCategory} />
                    <RecentActivity activities={data.recentActivity} />
                </div>

            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
