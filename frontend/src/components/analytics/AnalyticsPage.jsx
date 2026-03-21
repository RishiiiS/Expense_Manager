import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyticsPage.css';
import Sidebar from '../dashboard/Sidebar';

const TRANSACTIONS = [
  { id: 1, date: '2023-10-01', type: 'income', category: 'Salary', amount: 4500 },
  { id: 2, date: '2023-10-02', type: 'expense', category: 'Housing & Utilities', amount: 930 },
  { id: 3, date: '2023-10-03', type: 'expense', category: 'Food & Dining', amount: 280 },
  { id: 4, date: '2023-10-04', type: 'expense', category: 'Transport', amount: 90 },
  { id: 5, date: '2023-10-05', type: 'income', category: 'Freelance', amount: 820 },
  { id: 6, date: '2023-10-05', type: 'expense', category: 'Healthcare', amount: 140 },
  { id: 7, date: '2023-10-07', type: 'expense', category: 'Entertainment', amount: 160 },
  { id: 8, date: '2023-10-08', type: 'expense', category: 'Food & Dining', amount: 240 },
  { id: 9, date: '2023-10-09', type: 'income', category: 'Bonus', amount: 600 },
  { id: 10, date: '2023-10-10', type: 'expense', category: 'Housing & Utilities', amount: 420 },
  { id: 11, date: '2023-10-11', type: 'expense', category: 'Others', amount: 95 },
  { id: 12, date: '2023-10-12', type: 'expense', category: 'Food & Dining', amount: 350 },
  { id: 13, date: '2023-10-13', type: 'income', category: 'Freelance', amount: 670 },
  { id: 14, date: '2023-10-14', type: 'expense', category: 'Transport', amount: 72 },
  { id: 15, date: '2023-10-15', type: 'expense', category: 'Entertainment', amount: 410 },
  { id: 16, date: '2023-10-16', type: 'income', category: 'Salary', amount: 4550 },
  { id: 17, date: '2023-10-17', type: 'expense', category: 'Housing & Utilities', amount: 510 },
  { id: 18, date: '2023-10-18', type: 'expense', category: 'Food & Dining', amount: 260 },
  { id: 19, date: '2023-10-19', type: 'expense', category: 'Healthcare', amount: 130 },
  { id: 20, date: '2023-10-20', type: 'income', category: 'Freelance', amount: 720 },
  { id: 21, date: '2023-10-21', type: 'expense', category: 'Others', amount: 60 },
  { id: 22, date: '2023-10-23', type: 'expense', category: 'Food & Dining', amount: 300 },
  { id: 23, date: '2023-10-25', type: 'expense', category: 'Housing & Utilities', amount: 460 },
  { id: 24, date: '2023-10-27', type: 'income', category: 'Bonus', amount: 560 },
  { id: 25, date: '2023-10-29', type: 'expense', category: 'Entertainment', amount: 230 },
  { id: 26, date: '2023-10-31', type: 'expense', category: 'Transport', amount: 110 },
];

const CATEGORY_COLORS = {
  'Housing & Utilities': '#ff4a4a',
  'Food & Dining': '#f6b02e',
  Transport: '#60a5fa',
  Healthcare: '#34d399',
  Entertainment: '#f4f4f4',
  Others: '#f97316',
  Salary: '#71788a',
  Freelance: '#c084fc',
  Bonus: '#22c55e',
};

const WEEK_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WEEKDAY_INDEX_TO_LABEL = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const SORTED_DATES = [...new Set(TRANSACTIONS.map((item) => item.date))].sort();
const DEFAULT_FROM_DATE = SORTED_DATES[0];
const DEFAULT_TO_DATE = SORTED_DATES[SORTED_DATES.length - 1];
const STARTING_BALANCE = 12450;
const SAVINGS_TARGET = 20000;

const formatRuppee = (amount, fractionDigits = 2) =>
  `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;

const formatSignedPercent = (value) => {
  const rounded = Math.abs(value).toFixed(1);
  return value >= 0 ? `↗ +${rounded}%` : `↘ -${rounded}%`;
};

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) {
    return 'TH';
  }

  switch (day % 10) {
    case 1:
      return 'ST';
    case 2:
      return 'ND';
    case 3:
      return 'RD';
    default:
      return 'TH';
  }
};

const formatHeadlineDate = (dateValue) => {
  if (!dateValue) {
    return 'NO DATA';
  }

  const date = new Date(`${dateValue}T00:00:00`);
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
};

const AnalyticsPage = ({ initialMenu = 'analytics' }) => {
  const navigate = useNavigate();
  const activeMenu = initialMenu;
  const [dateFrom, setDateFrom] = useState(DEFAULT_FROM_DATE);
  const [dateTo, setDateTo] = useState(DEFAULT_TO_DATE);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const isAnalyticsView = activeMenu === 'analytics';
  const categoryOptions = useMemo(
    () => [...new Set(TRANSACTIONS.map((transaction) => transaction.category))],
    [],
  );

  const filteredTransactions = useMemo(
    () =>
      TRANSACTIONS.filter((transaction) => {
        const inDateRange = transaction.date >= dateFrom && transaction.date <= dateTo;
        const inCategory =
          selectedCategory === 'all' || transaction.category === selectedCategory;
        const inType = selectedType === 'all' || transaction.type === selectedType;

        return inDateRange && inCategory && inType;
      }),
    [dateFrom, dateTo, selectedCategory, selectedType],
  );

  const incomeTotal = useMemo(
    () =>
      filteredTransactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [filteredTransactions],
  );

  const expenseTotal = useMemo(
    () =>
      filteredTransactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [filteredTransactions],
  );

  const netSavings = incomeTotal - expenseTotal;
  const currentBalance = STARTING_BALANCE + netSavings;
  const savingsProgress = Math.max(0, Math.min((currentBalance / SAVINGS_TARGET) * 100, 100));
  const balanceGrowth = ((currentBalance - STARTING_BALANCE) / STARTING_BALANCE) * 100;

  const expenseByCategory = useMemo(() => {
    const totals = {};

    filteredTransactions.forEach((transaction) => {
      if (transaction.type !== 'expense') {
        return;
      }

      totals[transaction.category] = (totals[transaction.category] || 0) + transaction.amount;
    });

    return totals;
  }, [filteredTransactions]);

  const categories = useMemo(() => {
    const total = Object.values(expenseByCategory).reduce((sum, value) => sum + value, 0);

    if (!total) {
      return [];
    }

    return Object.entries(expenseByCategory)
      .sort(([, firstAmount], [, secondAmount]) => secondAmount - firstAmount)
      .map(([name, amount]) => ({
        name,
        amount,
        value: Math.round((amount / total) * 100),
        color: CATEGORY_COLORS[name] || '#f4f4f4',
      }));
  }, [expenseByCategory]);

  const categoryDonutBackground = useMemo(() => {
    if (!categories.length) {
      return 'radial-gradient(circle, #161922 57%, transparent 58%), conic-gradient(from -90deg, #252c3b 0 100%)';
    }

    const expenseSum = categories.reduce((sum, category) => sum + category.amount, 0);
    let currentStop = 0;
    const stops = categories.map((category) => {
      const start = currentStop;
      currentStop += (category.amount / expenseSum) * 100;
      return `${category.color} ${start}% ${currentStop}%`;
    });

    return `radial-gradient(circle, #161922 57%, transparent 58%), conic-gradient(from -90deg, ${stops.join(', ')})`;
  }, [categories]);

  const weeklyData = useMemo(() => {
    const totals = WEEK_DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { income: 0, expenses: 0 },
      }),
      {},
    );

    filteredTransactions.forEach((transaction) => {
      const weekday = new Date(`${transaction.date}T00:00:00`).getDay();
      const dayLabel = WEEKDAY_INDEX_TO_LABEL[weekday];

      if (transaction.type === 'income') {
        totals[dayLabel].income += transaction.amount;
      } else {
        totals[dayLabel].expenses += transaction.amount;
      }
    });

    const maxAmount = Math.max(
      ...WEEK_DAYS.flatMap((day) => [totals[day].income, totals[day].expenses]),
      1,
    );

    return WEEK_DAYS.map((day) => {
      const incomeHeight =
        totals[day].income === 0 ? 0 : Math.max(8, Math.round((totals[day].income / maxAmount) * 85));
      const expensesHeight =
        totals[day].expenses === 0
          ? 0
          : Math.max(8, Math.round((totals[day].expenses / maxAmount) * 85));

      return {
        day,
        incomeHeight,
        expensesHeight,
        incomeValue: totals[day].income,
        expensesValue: totals[day].expenses,
      };
    });
  }, [filteredTransactions]);

  const expenseTransactions = useMemo(
    () => filteredTransactions.filter((transaction) => transaction.type === 'expense'),
    [filteredTransactions],
  );

  const averageDailySpend = useMemo(() => {
    if (!expenseTransactions.length) {
      return 0;
    }

    const uniqueExpenseDays = new Set(expenseTransactions.map((transaction) => transaction.date)).size;
    return expenseTotal / uniqueExpenseDays;
  }, [expenseTransactions, expenseTotal]);

  const peakOutflow = useMemo(() => {
    if (!expenseTransactions.length) {
      return null;
    }

    return expenseTransactions.reduce((highest, transaction) =>
      transaction.amount > highest.amount ? transaction : highest,
    );
  }, [expenseTransactions]);

  const efficiencyFloor = useMemo(() => {
    if (!expenseTransactions.length) {
      return null;
    }

    return expenseTransactions.reduce((lowest, transaction) =>
      transaction.amount < lowest.amount ? transaction : lowest,
    );
  }, [expenseTransactions]);

  const handleFromDateChange = (event) => {
    const nextFrom = event.target.value;
    setDateFrom(nextFrom);

    if (nextFrom > dateTo) {
      setDateTo(nextFrom);
    }
  };

  const handleToDateChange = (event) => {
    const nextTo = event.target.value;
    setDateTo(nextTo);

    if (nextTo < dateFrom) {
      setDateFrom(nextTo);
    }
  };

  const handleResetFilters = () => {
    setDateFrom(DEFAULT_FROM_DATE);
    setDateTo(DEFAULT_TO_DATE);
    setSelectedCategory('all');
    setSelectedType('all');
  };

  return (
    <div className="analytics-page">
      <Sidebar activeMenu={activeMenu} />

      <main className="analytics-main">
        <header className="analytics-topbar">
          <div className="search-wrap">
            <svg className="analytics-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input placeholder="Search transactions..." />
          </div>
          <div className="profile-wrap">
            <button className="notify-btn" aria-label="notifications">
              <svg className="analytics-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 17H9M18 17V11C18 7.69 15.31 5 12 5C8.69 5 6 7.69 6 11V17L4 19H20L18 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="dot" />
            </button>
            <div className="user-info">
              <p>Alexander Rossi</p>
              <span>Pro Account</span>
            </div>
            <div className="avatar">AR</div>
          </div>
        </header>

        {isAnalyticsView ? (
          <>
            <section className="kpi-grid">
              <article className="kpi-card">
                <div className="kpi-header">
                  <p>STARTING BALANCE</p>
                  <svg className="analytics-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="kpi-value-row">
                  <h3>{formatRuppee(STARTING_BALANCE)}</h3>
                  <span className="chip">{filteredTransactions.length} TXNS</span>
                </div>
              </article>

              <article className="kpi-card">
                <div className="kpi-header">
                  <p>CURRENT BALANCE</p>
                  <svg className="analytics-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="kpi-value-row">
                  <h3>{formatRuppee(currentBalance)}</h3>
                  <span className="chip">{formatSignedPercent(balanceGrowth)}</span>
                </div>
              </article>

              <article className="kpi-card">
                <div className="kpi-header">
                  <p>TOTAL SAVED</p>
                  <svg className="analytics-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 12L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="kpi-value-row">
                  <h3 className="accent">{formatRuppee(netSavings)}</h3>
                  <span className="chip">{netSavings >= 0 ? 'HIGH PERFORMANCE' : 'RECOVERY MODE'}</span>
                </div>
              </article>

              <article className="kpi-card">
                <div className="kpi-header">
                  <p>SAVINGS TARGET</p>
                  <svg className="analytics-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 5H17L15 9L17 13H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="kpi-value-row">
                  <h3>{formatRuppee(SAVINGS_TARGET)}</h3>
                  <span className="muted">{savingsProgress.toFixed(1)}% PROGRESS</span>
                </div>
              </article>
            </section>

            <section className="filter-row">
              <label className="filter-btn filter-group">
                <svg className="analytics-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 2V6M16 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="date"
                  className="filter-date-input"
                  value={dateFrom}
                  min={DEFAULT_FROM_DATE}
                  max={DEFAULT_TO_DATE}
                  onChange={handleFromDateChange}
                />
                <span className="filter-separator">to</span>
                <input
                  type="date"
                  className="filter-date-input"
                  value={dateTo}
                  min={DEFAULT_FROM_DATE}
                  max={DEFAULT_TO_DATE}
                  onChange={handleToDateChange}
                />
              </label>

              <label className="filter-btn filter-group">
                Category
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categoryOptions.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="filter-btn filter-group">
                Type
                <select
                  className="filter-select"
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                >
                  <option value="all">Transaction Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label>

              <button type="button" className="reset-btn" onClick={handleResetFilters}>
                RESET FILTERS
              </button>
            </section>

            <section className="analytics-content-grid">
              <article className="panel cashflow-panel">
                <div className="panel-top">
                  <div>
                    <h2>Cash Flow</h2>
                    <p>Income vs Expenses (Weekly Trajectory)</p>
                  </div>
                  <div className="legend">
                    <span><i className="income-dot" />INCOME</span>
                    <span><i className="expense-dot" />EXPENSES</span>
                  </div>
                </div>

                <div className="bars">
                  {weeklyData.map((item) => (
                    <div className="day-col" key={item.day}>
                      <div className="bar-stack">
                        <div
                          className="bar expense"
                          style={{ height: `${item.expensesHeight}%` }}
                          title={`Expenses: ${formatRuppee(item.expensesValue, 0)}`}
                        />
                        <div
                          className="bar income"
                          style={{ height: `${item.incomeHeight}%` }}
                          title={`Income: ${formatRuppee(item.incomeValue, 0)}`}
                        />
                      </div>
                      <p>{item.day}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel category-panel">
                <div className="panel-title-row">
                  <h2>Categories</h2>
                  <button type="button">Live Split</button>
                </div>
                <div className="donut-wrap">
                  <div className="donut" style={{ background: categoryDonutBackground }}>
                    <div className="donut-inner">
                      <span>TOTAL EXP</span>
                      <strong>{formatRuppee(expenseTotal, 0)}</strong>
                    </div>
                  </div>
                </div>
                <ul className="category-list">
                  {(categories.length ? categories : [{ name: 'No expense data', value: 0, color: '#6b7280' }]).map(
                    (item) => (
                      <li key={item.name}>
                        <div>
                          <i style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </div>
                        <strong>{item.value}%</strong>
                      </li>
                    ),
                  )}
                </ul>
                <button
                  type="button"
                  className="floating-plus"
                  aria-label="Add new expense"
                  onClick={() => navigate('/add-expense')}
                >
                  +
                </button>
              </article>
            </section>

            <section className="bottom-stats">
              <article className="panel stat-card">
                <p>DAILY VELOCITY</p>
                <div>
                  <span>Avg. Daily Spend</span>
                  <strong className="yellow">{formatRuppee(averageDailySpend)}</strong>
                </div>
              </article>
              <article className="panel stat-card">
                <p>PEAK OUTFLOW</p>
                <div>
                  <span>Highest Day</span>
                  <strong className="red">
                    {peakOutflow ? formatRuppee(peakOutflow.amount) : formatRuppee(0)}
                  </strong>
                </div>
                <small>
                  {peakOutflow
                    ? `${formatHeadlineDate(peakOutflow.date)} - ${peakOutflow.category.toUpperCase()}`
                    : 'NO EXPENSE TRANSACTIONS'}
                </small>
              </article>
              <article className="panel stat-card">
                <p>EFFICIENCY FLOOR</p>
                <div>
                  <span>Lowest Day</span>
                  <strong className="yellow">
                    {efficiencyFloor ? formatRuppee(efficiencyFloor.amount) : formatRuppee(0)}
                  </strong>
                </div>
                <small>
                  {efficiencyFloor
                    ? `${formatHeadlineDate(efficiencyFloor.date)} - ${efficiencyFloor.category.toUpperCase()}`
                    : 'NO EXPENSE TRANSACTIONS'}
                </small>
              </article>
            </section>
          </>
        ) : (
          <section className="panel placeholder-panel">
            <h2>{activeMenu === 'dashboard' ? 'Dashboard' : 'Transactions'}</h2>
            <p>
              This section is a placeholder. Use the sidebar to switch back to
              <strong> Analytics</strong>.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default AnalyticsPage;
