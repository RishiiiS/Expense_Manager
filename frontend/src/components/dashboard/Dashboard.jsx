import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import TotalBalanceCard from './TotalBalanceCard';
import { IncomeExpenseCards } from './IncomeExpenseCards';
import CashFlowChart from './CashFlowChart';
import SpendingByCategory from './SpendingByCategory';
import RecentActivity from './RecentActivity';
import BudgetSummary from './BudgetSummary';
import { mockDashboardData } from '../../data/mockData';
import { getCurrentMonthlyProfile, getStoredUser } from '../../utils/monthlyProfile';
import { apiCall } from '../../utils/api';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const monthlyProfile = getCurrentMonthlyProfile();
    const storedUser = getStoredUser();
    const monthlyTarget = monthlyProfile?.savingTarget ?? 0;
    const incomeSource = monthlyProfile?.incomeSource;
    const userName = storedUser.name || 'User';
    
    const user = {
        name: userName,
        accountType: incomeSource ? `${incomeSource} Income` : 'Primary Account',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1e293b&color=fff`
    };

    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
        startingBalance: 0,
        totalBalance: 0,
        totalSavings: 0,
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

                let analyticsData = await apiCall(`/analytics?month=${month}&year=${year}`);
                
                const localIncome = monthlyProfile?.totalMonthlyIncome;
                if (!analyticsData.starting_balance && localIncome) {
                    await apiCall('/analytics/balance', {
                        method: 'POST',
                        body: JSON.stringify({ month, year, starting_balance: localIncome })
                    });
                    analyticsData = await apiCall(`/analytics?month=${month}&year=${year}`);
                }
                
                setAnalytics({
                    startingBalance: analyticsData.starting_balance || 0,
                    totalBalance: analyticsData.current_balance || 0,
                    totalSavings: analyticsData.total_savings || 0,
                    income: analyticsData.totalIncome || 0,
                    expenses: analyticsData.totalExpense || 0,
                });

                const expensesData = await apiCall('/expenses');
                
                if (expensesData && expensesData.length > 0) {
                    const recent = expensesData.slice(0, 3).map(exp => ({
                        id: exp.id,
                        title: exp.description || (exp.Category ? exp.Category.name : 'Expense'),
                        subtitle: new Date(exp.date).toLocaleDateString(),
                        amount: -Math.abs(Number(exp.amount)),
                        type: "Expense",
                        icon: (exp.description || exp.Category?.name || "EX").substring(0, 2).toUpperCase()
                    }));
                    setRecentActivity(recent);

                    // Calculate Cash Flow (Last 6 Months)
                    const today = new Date();
                    const cfMonths = [];
                    const incomeData = [0, 0, 0, 0, 0, 0];
                    const expenseData = [0, 0, 0, 0, 0, 0];

                    for (let i = 5; i >= 0; i--) {
                        const targetDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
                        cfMonths.push(targetDate.toLocaleString('default', { month: 'short' }));
                    }

                    expensesData.forEach(exp => {
                        const expDate = new Date(exp.date);
                        const monthDiff = (today.getFullYear() - expDate.getFullYear()) * 12 + today.getMonth() - expDate.getMonth();
                        
                        if (monthDiff >= 0 && monthDiff <= 5) {
                            const index = 5 - monthDiff;
                            const amt = Math.abs(Number(exp.amount));
                            const isIncome = exp.type === 'income' || (exp.Category && exp.Category.type === 'income');
                            
                            if (isIncome) {
                                incomeData[index] += amt;
                            } else {
                                expenseData[index] += amt;
                            }
                        }
                    });

                    // Add registered flat monthly income to current month if transactions income is lower
                    if (incomeData[5] < monthlyProfile?.totalMonthlyIncome) {
                        incomeData[5] = monthlyProfile.totalMonthlyIncome;
                    }

                    setCashFlow({ months: cfMonths, incomeData, expenseData });

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
                        startingBalance={analytics.startingBalance}
                        balance={analytics.totalBalance}
                        totalSavings={analytics.totalSavings}
                        change={0}
                        cardDetails={mockDashboardData.cardDetails}
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
