import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './features/accountList/accountsSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import transfersReducer from './features/transfers/transfersSlice';
import transactionsReducer from './features/transactions/transactionsSlice';

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    dashboard: dashboardReducer,
    transfers: transfersReducer,
    transactions: transactionsReducer,
  },
});

export default store;
