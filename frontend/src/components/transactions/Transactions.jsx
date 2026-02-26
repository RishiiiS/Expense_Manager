import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import TransactionSummary from './TransactionSummary';
import TransactionFilters from './TransactionFilters';
import TransactionsList from './TransactionsList';
import AddExpensePanel from './AddExpensePanel';
import { mockDashboardData, mockTransactionsData } from '../../data/mockData';
import '../../styles/Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState(mockTransactionsData.transactions);

    const handleAddExpense = (newExpenseData) => {
        const newTx = {
            id: Date.now(),
            title: newExpenseData.description,
            subtitle: newExpenseData.account,
            category: newExpenseData.category,
            date: newExpenseData.date,
            status: "Completed",
            icon: newExpenseData.icon,
            amount: newExpenseData.amount
        };
        // Add new transaction to the top of the list
        setTransactions([newTx, ...transactions]);
    };

    return (
        <div className="dashboard-layout"> {/* Reuse layout wrapper class */}
            <Sidebar />
            <div className="dashboard-main-content">
                {/* Custom Topbar for Transactions */}
                <header className="dashboard-topbar transactions-topbar">
                    <h1 className="page-title">Transactions</h1>
                    <div className="topbar-actions">
                        <div className="search-container small-search">
                            <span className="search-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </span>
                            <input type="text" placeholder="Search..." className="search-input" />
                        </div>
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
                        <TransactionFilters />
                        {/* We could potentially dynamically update the summary here too, but passing mock for now */}
                        <TransactionSummary summary={mockTransactionsData.summary} />
                        <TransactionsList transactions={transactions} pagination={{ showing: `1-${transactions.length}`, total: 128 + (transactions.length - 5) }} />
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
