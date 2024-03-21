import Dashboard from './pages/Dashboard';
import AccountDetailView from './features/AccountDetailView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Transfer from './pages/Transfer';
// import { generateData } from './services/useAccountData';
import NewAccount from './pages/NewAccount';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccounts } from './features/accountList/accountsSlice';
import { fetchTransactions } from './features/transactions/transactionsSlice';
import { Toaster } from 'react-hot-toast';
import TransactionDetailsPage from './pages/TransactionDetailsPage';

// generateData();

function App() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(fetchAccounts());
      dispatch(fetchTransactions());
    },
    [dispatch],
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* <Route index element={<Main />} /> */}
            <Route index element={<Dashboard />} />
            <Route path="account-details" element={<AccountDetailView />} />
            <Route path="transfers" element={<Transfer />} />
            <Route
              path="transaction-details/:id"
              element={<TransactionDetailsPage />}
            />
            <Route path="new-account" element={<NewAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 8000,
          },
          error: {
            duration: 5000,
          },
          style: {
            top: '5rem',
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-700)',
          },
        }}
      />
    </>
  );
}

export default App;
