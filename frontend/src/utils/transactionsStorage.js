const STORAGE_KEY = 'expense_manager_custom_transactions_v1';

const safeJsonParse = (value) => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const formatDateLabel = (input) => {
    const parsedDate = new Date(input);
    if (Number.isNaN(parsedDate.getTime())) {
        return input;
    }

    return parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const getStoredTransactions = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = safeJsonParse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed;
};

const saveStoredTransactions = (transactions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const appendStoredTransaction = (transaction) => {
    const existing = getStoredTransactions();
    saveStoredTransactions([transaction, ...existing]);
};

export const hydrateTransactions = (baseTransactions = []) => {
    const stored = getStoredTransactions();
    const seen = new Set(stored.map((transaction) => String(transaction.id)));
    const baseWithoutDuplicates = baseTransactions.filter(
        (transaction) => !seen.has(String(transaction.id))
    );

    return [...stored, ...baseWithoutDuplicates];
};

export const createTransactionFromExpenseData = (expenseData) => ({
    id: Date.now(),
    title: expenseData.description,
    subtitle: expenseData.account,
    category: expenseData.category,
    date: formatDateLabel(expenseData.date),
    status: 'Completed',
    icon: expenseData.icon || expenseData.category.charAt(0).toUpperCase(),
    amount: expenseData.amount,
    createdAt: new Date().toISOString()
});
