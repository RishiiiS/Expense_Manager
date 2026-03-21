import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddExpensePanel from './AddExpensePanel';
import {
    appendStoredTransaction,
    createTransactionFromExpenseData
} from '../../utils/transactionsStorage';
import '../../styles/Transactions.css';

const AddExpensePage = () => {
    const navigate = useNavigate();

    const handleAddExpense = (newExpenseData) => {
        const newTransaction = createTransactionFromExpenseData(newExpenseData);
        appendStoredTransaction(newTransaction);
        navigate('/transactions');
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
