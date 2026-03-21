import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import TransactionSummary from './TransactionSummary';
import TransactionFilters from './TransactionFilters';
import TransactionsList from './TransactionsList';
import AddExpensePanel from './AddExpensePanel';
import { mockDashboardData, mockTransactionsData } from '../../data/mockData';
import {
    appendStoredTransaction,
    createTransactionFromExpenseData,
    hydrateTransactions
} from '../../utils/transactionsStorage';
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
    const [transactions, setTransactions] = useState(() => hydrateTransactions(mockTransactionsData.transactions));
    const [summary, setSummary] = useState(mockTransactionsData.summary);
    const [dateFilter, setDateFilter] = useState('all_dates');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
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

    const handleAddExpense = (newExpenseData) => {
        const newTx = createTransactionFromExpenseData(newExpenseData);
        appendStoredTransaction(newTx);
        setTransactions((prevTransactions) => [newTx, ...prevTransactions]);
    };

    const handleEditExpenses = () => {
        const nextValue = window.prompt('Enter new total expenses amount', String(summary.totalExpenses));
        if (nextValue === null) return;

        const parsedValue = Number.parseFloat(nextValue);
        if (Number.isNaN(parsedValue)) return;

        setSummary((prev) => ({
            ...prev,
            totalExpenses: parsedValue,
            expensesChange: 'Manually updated'
        }));
    };

    const handleEditIncome = () => {
        const nextValue = window.prompt('Enter new total income amount', String(summary.totalIncome));
        if (nextValue === null) return;

        const parsedValue = Number.parseFloat(nextValue);
        if (Number.isNaN(parsedValue)) return;

        setSummary((prev) => ({
            ...prev,
            totalIncome: parsedValue,
            incomeChange: 'Manually updated'
        }));
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
                                <span className="user-name">{mockDashboardData.user.name}</span>
                                <span className="user-type">{mockDashboardData.user.accountType}</span>
                            </div>
                            <img src={mockDashboardData.user.avatar} alt="User" className="user-avatar" />
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
                            onEditExpenses={handleEditExpenses}
                            onEditIncome={handleEditIncome}
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
