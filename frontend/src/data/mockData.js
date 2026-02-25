export const mockDashboardData = {
    user: {
        name: "Alexander Rossi",
        accountType: "Pro Account",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    totalBalance: 82450.00,
    balanceChange: 2.5,
    cardDetails: {
        type: "VISA",
        holder: "ALEXANDER ROSSI",
        lastFour: "8842"
    },
    income: 12400,
    expenses: 4850,
    spendingByCategory: [
        { category: "Housing", amount: 2182.50, percentage: 45, color: "#ef4444" }, /* Red */
        { category: "Lifestyle", amount: 1212.50, percentage: 25, color: "#fbbf24" }, /* Yellow */
        { category: "Groceries", amount: 727.50, percentage: 15, color: "#3b82f6" }, /* Blue */
        { category: "Others", amount: 727.50, percentage: 15, color: "#10b981" }  /* Green */
    ],
    recentActivity: [
        { id: 1, title: "Apple Services", subtitle: "Today, 10:45 AM", amount: -14.99, type: "Subscription", icon: "📱" },
        { id: 2, title: "Stripe Inc.", subtitle: "Yesterday, 08:30 PM", amount: 8500.00, type: "Salary", icon: "💵" },
        { id: 3, title: "Zara Store", subtitle: "2 days ago", amount: -189.20, type: "Shopping", icon: "🛍️" }
    ],
    cashFlow: {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        incomeData: [65000, 58000, 80000, 82000, 55000, 95000], /* Scaled up to match chart shape */
        expenseData: [45000, 48000, 42000, 52000, 38000, 42000]
    }
};

export const mockTransactionsData = {
    summary: {
        totalExpenses: 4850.24,
        expensesChange: "+12% from last month",
        totalIncome: 12400.00,
        incomeChange: "+5% from last month"
    },
    transactions: [
        {
            id: 1,
            title: "Apple Services",
            subtitle: "Monthly Subscription",
            category: "Software",
            date: "Oct 24, 2023",
            status: "Completed",
            icon: "📱"
        },
        {
            id: 2,
            title: "Stripe Inc.",
            subtitle: "Freelance Payment",
            category: "Income",
            date: "Oct 23, 2023",
            status: "Completed",
            icon: "💼"
        },
        {
            id: 3,
            title: "Starbucks",
            subtitle: "Coffee & Snack",
            category: "Food",
            date: "Oct 22, 2023",
            status: "Pending",
            icon: "☕"
        },
        {
            id: 4,
            title: "Zara",
            subtitle: "Clothing",
            category: "Lifestyle",
            date: "Oct 21, 2023",
            status: "Completed",
            icon: "🛍️"
        },
        {
            id: 5,
            title: "Delta Airlines",
            subtitle: "Flight to NYC",
            category: "Travel",
            date: "Oct 20, 2023",
            status: "Completed",
            icon: "✈️"
        }
    ],
    pagination: {
        showing: "1-5",
        total: 128
    }
};
