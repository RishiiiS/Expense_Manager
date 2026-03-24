import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddExpensePanel from './AddExpensePanel';
import { apiCall } from '../../utils/api';
import '../../styles/Transactions.css';

const AddExpensePage = () => {
    const navigate = useNavigate();

    const handleAddExpense = async (newExpenseData) => {
        try {
            await apiCall('/expenses', {
                method: 'POST',
                body: JSON.stringify(newExpenseData)
            });
            navigate('/transactions');
        } catch (error) {
            console.error("Add expense failed", error);
            alert(error.message);
        }
    };

    return (
        <main className="add-expense-standalone">
            <div className="add-expense-page-panel">
                <AddExpensePanel onAddExpense={handleAddExpense} />
            </div>
        </main>
    );
};

export default AddExpensePage;
