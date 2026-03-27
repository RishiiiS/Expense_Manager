import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';

const AddExpensePanel = ({ onAddExpense }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Use standard YYYY-MM-DD
    const [account, setAccount] = useState('Primary');
    const [type, setType] = useState('debit');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiCall('/categories', {}, { silent: true });
                setCategories(data);
                if (data.length > 0) {
                    setCategoryId(data[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !description || !categoryId) return;

        let parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) parsedAmount = 0;

        setIsLoading(true);
        try {
            parsedAmount = Math.abs(parsedAmount);

            const newExpenseDef = {
                amount: parsedAmount,
                description,
                date,
                category_id: parseInt(categoryId),
                account,
                type
            };

            if (onAddExpense) {
                await onAddExpense(newExpenseDef);
            }

            setAmount('');
            setDescription('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-expense-panel">
            <div className="panel-header">
                <h2>Add New Expense</h2>
            </div>

            <form className="add-expense-form" onSubmit={handleSubmit}>
                <div className="form-group type-group">
                    <label>TRANSACTION TYPE</label>
                    <div className="type-toggle-container" style={{ display: 'flex', gap: '10px' }}>
                        <label className="type-radio-label" style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: type === 'credit' ? '#10b981' : 'var(--text-muted)' }}>
                            <input type="radio" name="transactionType" value="credit" checked={type === 'credit'} onChange={(e) => setType(e.target.value)} />
                            Credit
                        </label>
                        <label className="type-radio-label" style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: type === 'debit' ? '#ef4444' : 'var(--text-muted)' }}>
                            <input type="radio" name="transactionType" value="debit" checked={type === 'debit'} onChange={(e) => setType(e.target.value)} />
                            Debit
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>AMOUNT</label>
                    <div className="amount-input-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input
                            type="text"
                            placeholder="0.00"
                            value={amount}
                            inputMode="decimal"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) {
                                    setAmount(value);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>DESCRIPTION</label>
                    <input
                        type="text"
                        placeholder="e.g. Starbucks, Uber Trip"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group half-width">
                        <label>CATEGORY</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group half-width">
                        <label>DATE</label>
                        <div className="date-input-wrapper">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>PAYMENT METHOD</label>
                    <select value={account} onChange={(e) => setAccount(e.target.value)}>
                        <option value="Primary">Primary Checking •••• 4590</option>
                        <option value="CreditCard">Visa Credit Card •••• 8842</option>
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

                <button type="submit" className="save-expense-btn" disabled={isLoading}>
                    <span className="save-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    </span>
                    {isLoading ? 'Saving...' : 'Save Expense'}
                </button>
            </form>
        </div>
    );
};
export default AddExpensePanel;
