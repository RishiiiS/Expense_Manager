import React from 'react';
import DashboardLayout from './DashboardLayout';
import TotalBalanceCard from './TotalBalanceCard';
import { IncomeExpenseCards } from './IncomeExpenseCards';
import CashFlowChart from './CashFlowChart';
import SpendingByCategory from './SpendingByCategory';
import RecentActivity from './RecentActivity';
import { mockDashboardData as data } from '../../data/mockData';
import { getCurrentMonthlyProfile } from '../../utils/monthlyProfile';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const monthlyProfile = getCurrentMonthlyProfile();
    const monthlyIncome = monthlyProfile?.totalMonthlyIncome ?? data.income;
    const monthlyTarget = monthlyProfile?.savingTarget ?? 0;
    const incomeSource = monthlyProfile?.incomeSource;
    const user = {
        ...data.user,
        accountType: incomeSource ? `${incomeSource} Income` : data.user.accountType
    };

    return (
        <DashboardLayout user={user}>
            <div className="dashboard-grid">

                {/* Left Column */}
                <div className="dashboard-col-left">
                    <TotalBalanceCard
                        balance={data.totalBalance}
                        change={data.balanceChange}
                        cardDetails={data.cardDetails}
                        savingsTarget={monthlyTarget}
                    />
                    <IncomeExpenseCards
                        income={monthlyIncome}
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
