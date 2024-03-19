import Dashboard from './pages/Dashboard';
import AccountDetailView from './features/AccountDetailView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Transfer from './pages/Transfer';
import { generateData } from './services/useAccountData';
import NewAccount from './pages/NewAccount';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchAccounts,
  fetchTransactions,
} from './features/accountList/accountsSlice';

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
            <Route path="new-account" element={<NewAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div className=" grid grid-rows-12 w-dvw h-dvh">
        <Header />
        <AccountDetailView />
        {/* <Dashboard />
        <AccountList /> */}
      {/* <Footer />
      </div> */}
    </>
  );
}

export default App;
