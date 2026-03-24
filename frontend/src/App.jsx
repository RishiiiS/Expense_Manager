import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import AddExpensePage from './components/transactions/AddExpensePage';
import './App.css';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import { hasCurrentMonthProfile } from './utils/monthlyProfile';
import Toast from './components/common/Toast';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCurrentMonthProfile()) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <ProtectedRoute>
                <AddExpensePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
