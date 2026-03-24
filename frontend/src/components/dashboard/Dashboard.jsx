import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import TotalBalanceCard from './TotalBalanceCard';
import { IncomeExpenseCards } from './IncomeExpenseCards';
import CashFlowChart from './CashFlowChart';
import SpendingByCategory from './SpendingByCategory';
import RecentActivity from './RecentActivity';
import BudgetSummary from './BudgetSummary';
import { mockDashboardData } from '../../data/mockData';
import { getCurrentMonthlyProfile } from '../../utils/monthlyProfile';
import { apiCall } from '../../utils/api';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const monthlyProfile = getCurrentMonthlyProfile();
    const monthlyTarget = monthlyProfile?.savingTarget ?? 0;
    const incomeSource = monthlyProfile?.incomeSource;
    const user = {
        ...mockDashboardData.user,
        accountType: incomeSource ? `${incomeSource} Income` : mockDashboardData.user.accountType
    };

    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
        totalBalance: 0,
        income: 0,
        expenses: 0,
    });
    const [spendingByCategory, setSpendingByCategory] = useState(mockDashboardData.spendingByCategory);
    const [recentActivity, setRecentActivity] = useState(mockDashboardData.recentActivity);
    const [cashFlow, setCashFlow] = useState(mockDashboardData.cashFlow);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const date = new Date();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const analyticsData = await apiCall(`/analytics?month=${month}&year=${year}`);
                setAnalytics({
                    totalBalance: analyticsData.balance || 0,
                    income: Math.max(analyticsData.totalIncome || 0, monthlyProfile?.totalMonthlyIncome || 0), // Default to set income
                    expenses: analyticsData.totalExpense || 0,
                });

                const expensesData = await apiCall('/expenses');
                
                if (expensesData && expensesData.length > 0) {
                    const recent = expensesData.slice(0, 3).map(exp => ({
                        id: exp.id,
                        title: exp.description || (exp.Category ? exp.Category.name : 'Expense'),
                        subtitle: new Date(exp.date).toLocaleDateString(),
                        amount: -exp.amount,
                        type: "Expense",
                        icon: (exp.description || exp.Category?.name || "EX").substring(0, 2).toUpperCase()
                    }));
                    setRecentActivity(recent);

                    const currentMonthExpenses = expensesData.filter(exp => {
                        const expDate = new Date(exp.date);
                        return expDate.getMonth() + 1 === month && expDate.getFullYear() === year;
                    });

                    const categoryMap = {};
                    let totalSpent = 0;
                    currentMonthExpenses.forEach(exp => {
                        const catName = exp.Category ? exp.Category.name : 'Other';
                        categoryMap[catName] = (categoryMap[catName] || 0) + Number(exp.amount);
                        totalSpent += Number(exp.amount);
                    });

                    const colors = ["#ef4444", "#fbbf24", "#3b82f6", "#10b981", "#8b5cf6"];
                    const spendingData = Object.keys(categoryMap).map((catName, index) => ({
                        category: catName,
                        amount: categoryMap[catName],
                        percentage: totalSpent > 0 ? Math.round((categoryMap[catName] / totalSpent) * 100) : 0,
                        color: colors[index % colors.length]
                    })).sort((a,b) => b.amount - a.amount);

                    if (spendingData.length > 0) {
                        setSpendingByCategory(spendingData);
                    }
                }
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [monthlyProfile]);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <DashboardLayout user={user}>
            <div className="dashboard-grid">
                <div className="dashboard-col-left">
                    <TotalBalanceCard
                        balance={analytics.totalBalance || analytics.income - analytics.expenses}
                        change={0}
                        cardDetails={mockDashboardData.cardDetails}
                        savingsTarget={monthlyTarget}
                    />
                    <BudgetSummary />
                    <IncomeExpenseCards
                        income={analytics.income}
                        expenses={analytics.expenses}
                    />
                </div>
                <div className="dashboard-col-right-top">
                    <CashFlowChart data={cashFlow} />
                </div>
                <div className="dashboard-bottom-row">
                    <SpendingByCategory data={spendingByCategory} />
                    <RecentActivity activities={recentActivity} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
