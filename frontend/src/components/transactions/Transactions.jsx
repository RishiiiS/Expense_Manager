import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import TransactionSummary from './TransactionSummary';
import TransactionFilters from './TransactionFilters';
import TransactionsList from './TransactionsList';
import AddExpensePanel from './AddExpensePanel';
import { apiCall } from '../../utils/api';
import { getStoredUser, getCurrentMonthlyProfile } from '../../utils/monthlyProfile';
import '../../styles/Transactions.css';

const parseTransactionDate = (transaction) => {
    if (transaction.createdAt) {
        const createdAtTime = new Date(transaction.createdAt).getTime();
        if (!Number.isNaN(createdAtTime)) return createdAtTime;
    }

    const parsedDate = new Date(transaction.date).getTime();
    if (!Number.isNaN(parsedDate)) return parsedDate;

    return Number(transaction.id) || 0;
};

const Transactions = () => {
    const storedUser = getStoredUser();
    const monthlyProfile = getCurrentMonthlyProfile();
    const userName = storedUser.name || 'User';
    const accountType = monthlyProfile?.incomeSource ? `${monthlyProfile.incomeSource} Income` : 'Primary Account';
    const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1e293b&color=fff`;

    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ 
        startingBalance: 0,
        totalSavings: 0,
        totalExpenses: 0, 
        expensesChange: '', 
        remainingAmount: 0, 
        remainingChange: '' 
    });
    const [dateFilter, setDateFilter] = useState('all_dates');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const data = await apiCall('/expenses');
            
            // Map the backend transactions to the UI format
            const mappedTransactions = data.map(exp => {
                const isCredit = exp.type === 'credit';
                return {
                    id: exp.id,
                    title: exp.description || 'Transaction',
                    subtitle: exp.account || 'Primary',
                    category: exp.Category ? exp.Category.name : 'Other',
                    date: exp.date,
                    status: 'Completed',
                    icon: (exp.Category?.name || "TR").substring(0, 2).toUpperCase(),
                    amount: isCredit ? Number(exp.amount) : -Math.abs(Number(exp.amount)) 
                };
            });
            setTransactions(mappedTransactions);

            // Fetch summary stats
            const date = new Date();
            let analyticsData = await apiCall(`/analytics?month=${date.getMonth()+1}&year=${date.getFullYear()}`);
            
            const localIncome = monthlyProfile?.totalMonthlyIncome;
            if (!analyticsData.starting_balance && localIncome) {
                await apiCall('/analytics/balance', {
                    method: 'POST',
                    body: JSON.stringify({ month: date.getMonth()+1, year: date.getFullYear(), starting_balance: localIncome })
                });
                analyticsData = await apiCall(`/analytics?month=${date.getMonth()+1}&year=${date.getFullYear()}`);
            }
            
            setSummary({
                startingBalance: analyticsData.starting_balance || 0,
                totalSavings: analyticsData.total_savings || 0,
                totalExpenses: analyticsData.totalExpense || 0,
                expensesChange: "This month",
                remainingAmount: analyticsData.current_balance || 0,
                remainingChange: "This month",
            });

        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTransactions();
    }, []);

    const sortedTransactions = [...transactions].sort((a, b) => parseTransactionDate(b) - parseTransactionDate(a));
    const filteredTransactions = sortedTransactions.filter((transaction) => {
        const transactionDate = new Date(parseTransactionDate(transaction));
        const now = new Date();

        const matchesDate = (() => {
            if (dateFilter === 'all_dates') return true;
            if (Number.isNaN(transactionDate.getTime())) return false;

            if (dateFilter === 'this_month') {
                return (
                    transactionDate.getMonth() === now.getMonth() &&
                    transactionDate.getFullYear() === now.getFullYear()
                );
            }

            if (dateFilter === 'last_30_days') {
                const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                return transactionDate >= thirtyDaysAgo;
            }

            return true;
        })();

        const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
        const matchesType =
            typeFilter === 'all' ||
            (typeFilter === 'income' && transaction.amount > 0) ||
            (typeFilter === 'expense' && transaction.amount < 0);

        return matchesDate && matchesCategory && matchesType;
    });
    const visibleTransactions = filteredTransactions.slice(0, 8);

    const handleAddExpense = async (newExpenseData) => {
        try {
            await apiCall('/expenses', {
                method: 'POST',
                body: JSON.stringify(newExpenseData)
            });
            await fetchTransactions(); // Refresh list to get new DB ID and properly formatted item
        } catch (error) {
            console.error("Failed to add expense:", error);
            alert(error.message);
        }
    };

    const handleEditStartingBalance = async () => {
        const nextValue = window.prompt('Enter new Starting Balance', String(summary.startingBalance));
        if (nextValue === null || nextValue.trim() === '') return;

        const parsedValue = Number.parseFloat(nextValue);
        if (Number.isNaN(parsedValue)) return;

        try {
            const date = new Date();
            await apiCall('/analytics/balance', {
                method: 'POST',
                body: JSON.stringify({
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    starting_balance: parsedValue
                })
            });
            await fetchTransactions(); // Refresh summary metrics server-side
        } catch (error) {
            console.error("Failed to set starting balance", error);
            alert("Error setting balance: " + error.message);
        }
    };

    return (
        <div className="dashboard-layout"> {/* Reuse layout wrapper class */}
            <Sidebar />
            <div className="dashboard-main-content">
                {/* Custom Topbar for Transactions */}
                <header className="dashboard-topbar transactions-topbar">
                    <div className="search-container small-search">
                        <span className="search-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </span>
                        <input type="text" placeholder="Search..." className="search-input" />
                    </div>
                    <div className="topbar-actions">
                        <button className="notification-btn" aria-label="Notifications">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 17H9"></path>
                                <path d="M18 17V11C18 7.69 15.31 5 12 5C8.69 5 6 7.69 6 11V17L4 19H20L18 17Z"></path>
                            </svg>
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-profile">
                            <div className="user-info">
                                <span className="user-name">{userName}</span>
                                <span className="user-type">{accountType}</span>
                            </div>
                            <img src={userAvatar} alt="User" className="user-avatar" />
                        </div>
                    </div>
                </header>

                <main className="transactions-content-area">
                    <div className="transactions-left-col">
                        <TransactionFilters
                            dateFilter={dateFilter}
                            categoryFilter={categoryFilter}
                            typeFilter={typeFilter}
                            onDateFilterChange={setDateFilter}
                            onCategoryFilterChange={setCategoryFilter}
                            onTypeFilterChange={setTypeFilter}
                        />
                        {/* We could potentially dynamically update the summary here too, but passing mock for now */}
                        <TransactionSummary
                            summary={summary}
                            onEditStartingBalance={handleEditStartingBalance}
                        />
                        <TransactionsList
                            transactions={visibleTransactions}
                            pagination={{
                                showing: `1-${visibleTransactions.length}`,
                                total: filteredTransactions.length
                            }}
                        />
                    </div>
                    <div className="transactions-right-col">
                        <AddExpensePanel onAddExpense={handleAddExpense} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Transactions;
