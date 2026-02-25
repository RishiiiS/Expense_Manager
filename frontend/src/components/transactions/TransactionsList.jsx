import React from 'react';

const TransactionsList = ({ transactions, pagination }) => {
    return (
        <div className="transactions-list-container">
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th className="checkbox-col"><input type="checkbox" /></th>
                        <th>TRANSACTION</th>
                        <th>CATEGORY</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td className="checkbox-col">
                                <input type="checkbox" defaultChecked={tx.id === 2} />
                            </td>
                            <td className="transaction-cell">
                                <div className="tx-icon-wrapper">
                                    <span>{tx.icon}</span>
                                </div>
                                <div className="tx-details">
                                    <span className="tx-title">{tx.title}</span>
                                    <span className="tx-subtitle">{tx.subtitle}</span>
                                </div>
                            </td>
                            <td>
                                <span className={`category-badge badge-${tx.category.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {tx.category}
                                </span>
                            </td>
                            <td className="tx-date">
                                {tx.date.split(',')[0]},<br />
                                {tx.date.split(',')[1]?.trim()}
                            </td>
                            <td>
                                <span className="status-container">
                                    <span className="tx-status-indicator" style={{ backgroundColor: tx.status === 'Completed' ? '#10b981' : '#fbbf24' }}></span>
                                    {tx.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-row">
                <span className="pagination-text">
                    Showing <strong>{pagination.showing}</strong> of <strong>{pagination.total}</strong> transactions
                </span>
                <div className="pagination-controls">
                    <button className="page-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className="page-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TransactionsList;
