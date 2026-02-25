import React from 'react';
import Sidebar from '../dashboard/Sidebar';
import TransactionSummary from './TransactionSummary';
import TransactionFilters from './TransactionFilters';
import TransactionsList from './TransactionsList';
import AddExpensePanel from './AddExpensePanel';
import { mockDashboardData, mockTransactionsData } from '../../data/mockData';
import '../../styles/Transactions.css';

const Transactions = () => {
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
                        <TransactionSummary summary={mockTransactionsData.summary} />
                        <TransactionsList transactions={mockTransactionsData.transactions} pagination={mockTransactionsData.pagination} />
                    </div>
                    <div className="transactions-right-col">
                        <AddExpensePanel />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Transactions;
