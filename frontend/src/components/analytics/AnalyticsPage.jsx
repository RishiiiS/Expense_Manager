import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyticsPage.css';
import Sidebar from '../dashboard/Sidebar';
import { getCurrentMonthlyProfile, getStoredUser } from '../../utils/monthlyProfile';

import { apiCall } from '../../utils/api';

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
  const [transactions, setTransactions] = useState([]);
  const [globalStats, setGlobalStats] = useState({ startingBalance: 0, currentBalance: 0, totalSavings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionsAndStats = async () => {
      try {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();

        let [expensesData, analyticsData] = await Promise.all([
          apiCall('/expenses'),
          apiCall(`/analytics?month=${currentMonth}&year=${currentYear}`)
        ]);
        
        const localIncome = monthlyProfile?.totalMonthlyIncome;
        if (!analyticsData.starting_balance && localIncome) {
            await apiCall('/analytics/balance', {
                method: 'POST',
                body: JSON.stringify({ month: currentMonth, year: currentYear, starting_balance: localIncome })
            });
            analyticsData = await apiCall(`/analytics?month=${currentMonth}&year=${currentYear}`);
        }
        
        const mapped = expensesData.map((exp) => ({
          id: exp.id,
          date: exp.date,
          type: exp.type === 'credit' ? 'credit' : 'debit',
          category: exp.Category ? exp.Category.name : 'Others',
          amount: Math.abs(Number(exp.amount)),
        }));
        setTransactions(mapped);
        setGlobalStats({
          startingBalance: analyticsData.starting_balance || 0,
          currentBalance: analyticsData.current_balance || 0,
          totalSavings: analyticsData.total_savings || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactionsAndStats();
  }, []);

  const SORTED_DATES = useMemo(() => {
    return [...new Set(transactions.map((item) => item.date))].sort();
  }, [transactions]);

  const defaultFromDate = SORTED_DATES.length ? SORTED_DATES[0] : new Date().toISOString().split('T')[0];
  const defaultToDate = SORTED_DATES.length ? SORTED_DATES[SORTED_DATES.length - 1] : new Date().toISOString().split('T')[0];

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    if (SORTED_DATES.length > 0 && !dateFrom) {
      setDateFrom(defaultFromDate);
      setDateTo(defaultToDate);
    }
  }, [SORTED_DATES]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const monthlyProfile = useMemo(() => getCurrentMonthlyProfile(), []);
  const storedUser = useMemo(() => getStoredUser(), []);
  const userName = storedUser.name || 'User';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const isAnalyticsView = activeMenu === 'analytics';
  const registeredIncomeSource = monthlyProfile?.incomeSource || 'Primary Account';
  const registeredSavingsTarget = monthlyProfile?.savingTarget || SAVINGS_TARGET;
  const baselineAmount = globalStats.startingBalance;
  const categoryOptions = useMemo(
    () => [...new Set(transactions.map((transaction) => transaction.category))],
    [transactions],
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const inDateRange = transaction.date >= dateFrom && transaction.date <= dateTo;
        const inCategory =
          selectedCategory === 'all' || transaction.category === selectedCategory;
        const inType = selectedType === 'all' || transaction.type === selectedType;

        return inDateRange && inCategory && inType;
      }),
    [transactions, dateFrom, dateTo, selectedCategory, selectedType],
  );

  const incomeTotal = useMemo(
    () =>
      filteredTransactions
        .filter((transaction) => transaction.type === 'credit')
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [filteredTransactions],
  );

  const expenseTotal = useMemo(
    () =>
      filteredTransactions
        .filter((transaction) => transaction.type === 'debit')
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [filteredTransactions],
  );

  const currentBalance = globalStats.currentBalance;
  const netSavings = globalStats.totalSavings;
  const savingsProgress = Math.max(0, Math.min((currentBalance / registeredSavingsTarget) * 100, 100));
  const balanceGrowth = baselineAmount ? ((currentBalance - baselineAmount) / baselineAmount) * 100 : 0;

  const expenseByCategory = useMemo(() => {
    const totals = {};

    filteredTransactions.forEach((transaction) => {
      if (transaction.type !== 'debit') {
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
    
    const fallbackColors = ['#ff4a4a', '#f6b02e', '#60a5fa', '#34d399', '#c084fc', '#f97316', '#10b981', '#ef4444', '#3b82f6'];

    return Object.entries(expenseByCategory)
      .sort(([, firstAmount], [, secondAmount]) => secondAmount - firstAmount)
      .map(([name, amount], index) => ({
        name,
        amount,
        value: Math.round((amount / total) * 100),
        color: CATEGORY_COLORS[name] || fallbackColors[index % fallbackColors.length],
      }));
  }, [expenseByCategory]);

  const categoryDonutBackground = useMemo(() => {
    if (!categories.length) {
      return 'radial-gradient(circle, var(--panel, #161922) 57%, transparent 58%), conic-gradient(from -90deg, var(--border-alpha-10, #252c3b) 0 100%)';
    }

    const expenseSum = categories.reduce((sum, category) => sum + category.amount, 0);
    let currentStop = 0;
    const stops = categories.map((category) => {
      const start = currentStop;
      currentStop += (category.amount / expenseSum) * 100;
      return `${category.color} ${start}% ${currentStop}%`;
    });

    return `radial-gradient(circle, var(--panel, #161922) 57%, transparent 58%), conic-gradient(from -90deg, ${stops.join(', ')})`;
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

      if (transaction.type === 'credit') {
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
    () => filteredTransactions.filter((transaction) => transaction.type === 'debit'),
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
    setDateFrom(defaultFromDate);
    setDateTo(defaultToDate);
    setSelectedCategory('all');
    setSelectedType('all');
  };

  if (loading) return <div>Loading Analytics...</div>;

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
              <p>{userName}</p>
              <span>{registeredIncomeSource}</span>
            </div>
            <div className="avatar">{userInitials}</div>
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
                  <h3>{formatRuppee(baselineAmount)}</h3>
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
                  <h3>{formatRuppee(registeredSavingsTarget)}</h3>
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
                  min={defaultFromDate}
                  max={defaultToDate}
                  onChange={handleFromDateChange}
                />
                <span className="filter-separator">to</span>
                <input
                  type="date"
                  className="filter-date-input"
                  value={dateTo}
                  min={defaultFromDate}
                  max={defaultToDate}
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
                  <option value="credit">Credit / Income</option>
                  <option value="debit">Debit / Expense</option>
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
