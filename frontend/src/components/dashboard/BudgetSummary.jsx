import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import './BudgetSummary.css';

const BudgetSummary = () => {
    const [budgetData, setBudgetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newLimit, setNewLimit] = useState('');

    const fetchBudget = async () => {
        try {
            const date = new Date();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const data = await apiCall(`/budgets?month=${month}&year=${year}`);
            setBudgetData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudget();
    }, []);

    const handleUpdateBudget = async (e) => {
        e.preventDefault();
        try {
            const date = new Date();
            await apiCall('/budgets', {
                method: 'POST',
                body: JSON.stringify({
                    monthly_limit: Number(newLimit),
                    month: date.getMonth() + 1,
                    year: date.getFullYear()
                })
            });
            setIsEditing(false);
            setNewLimit('');
            await fetchBudget();
            window.dispatchEvent(new CustomEvent('api_success', { detail: 'Budget updated successfully!' }));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="budget-summary-card">Loading budget...</div>;

    const limit = budgetData?.budget_limit || 0;
    const spent = budgetData?.total_spent || 0;
    const remaining = budgetData?.remaining || 0;
    const progress = Math.min((spent / (limit || 1)) * 100, 100);
    const overBudget = remaining < 0;

    return (
        <div className="budget-summary-card">
            <div className="budget-header">
                <h3>Monthly Budget</h3>
                {!isEditing && (
                    <button className="edit-budget-btn" onClick={() => { setIsEditing(true); setNewLimit(limit); }}>
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <form className="budget-form" onSubmit={handleUpdateBudget}>
                    <input
                        type="number"
                        min="0"
                        value={newLimit}
                        onChange={(e) => setNewLimit(e.target.value)}
                        placeholder="Enter budget limit"
                        required
                    />
                    <div className="budget-form-actions">
                        <button type="submit" className="save-btn">Save</button>
                        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="budget-content">
                    <div className="budget-stats">
                        <div className="stat">
                            <span>Limit</span>
                            <strong>₹{limit.toLocaleString()}</strong>
                        </div>
                        <div className="stat">
                            <span>Spent</span>
                            <strong>₹{spent.toLocaleString()}</strong>
                        </div>
                        <div className="stat">
                            <span>Remaining</span>
                            <strong className={overBudget ? 'over-budget' : ''}>
                                {overBudget ? '-' : ''}₹{Math.abs(remaining).toLocaleString()}
                            </strong>
                        </div>
                    </div>
                    <div className="progress-bar-container">
                        <div 
                            className={`progress-bar-fill ${progress >= 90 ? 'danger' : progress >= 75 ? 'warning' : ''}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        {progress.toFixed(1)}% used
                        {overBudget && <span className="over-budget-warning"> (Over budget)</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetSummary;
