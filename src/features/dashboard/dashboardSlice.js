import { createSlice } from '@reduxjs/toolkit';
import { portfolio } from '../accountList/accountsSlice.js';
import { filterTransactionsByAcct } from '../../utils/helpers.js';

const initialState = {
  dashboardAccount: portfolio,
  filters: ['Balance', 'Deposits', 'Expenses', 'Net'],
  dashboardFilter: 'Balance',
  periods: [1, 30, 90, 180, 365],
  dashboardPeriod: 30,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setDashboardAccount(state, action) {
      state.dashboardAccount = action.payload;
    },
    setDashboardFilter(state, action) {
      state.dashboardFilter = action.payload;
    },
    setDashboardPeriod(state, action) {
      state.dashboardPeriod = action.payload;
    },
    setDashboardTransactions(state, action) {
      state.dashboardTransactions = action.payload;
    },
  },
});

export const {
  setDashboardAccount,
  setDashboardFilter,
  setDashboardTransactions,
  setDashboardPeriod,
} = dashboardSlice.actions;

export const getDashboardTransactions = (state) =>
  filterTransactionsByAcct(state.dashboardAccount);

export const dashboardAccount = (state) => state.dashboardAccount;
export default dashboardSlice.reducer;
