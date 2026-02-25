import React from 'react';

const AddExpensePanel = () => {
    return (
        <div className="add-expense-panel">
            <div className="panel-header">
                <h2>Add New Expense</h2>
                <button className="close-panel-btn">✕</button>
            </div>

            <form className="add-expense-form">
                <div className="form-group">
                    <label>AMOUNT</label>
                    <div className="amount-input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input type="text" placeholder="0.00" />
                    </div>
                </div>

                <div className="form-group">
                    <label>DESCRIPTION</label>
                    <input type="text" placeholder="e.g. Starbucks, Uber Trip" />
                </div>

                <div className="form-row">
                    <div className="form-group half-width">
                        <label>CATEGORY</label>
                        <select defaultValue="Food">
                            <option value="Food">🥘 Food & Drink</option>
                        </select>
                    </div>
                    <div className="form-group half-width">
                        <label>DATE</label>
                        <div className="date-input-wrapper">
                            <span className="calendar-icon">📅</span>
                            <input type="text" defaultValue="10/25/2023" />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>ACCOUNT / WALLET</label>
                    <select defaultValue="Primary">
                        <option value="Primary">💳 Primary Checking •••• 4590</option>
                    </select>
                </div>

                <div className="form-group receipt-group">
                    <label>RECEIPT UPLOAD</label>
                    <div className="upload-area">
                        <div className="upload-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        </div>
                        <span className="upload-text">Click or drag receipt here</span>
                        <span className="upload-hint">Supports JPG, PNG, PDF (Max 5MB)</span>
                    </div>
                </div>

                <button type="button" className="save-expense-btn">
                    <span className="save-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    </span>
                    Save Expense
                </button>
            </form>
        </div>
    );
};
export default AddExpensePanel;
