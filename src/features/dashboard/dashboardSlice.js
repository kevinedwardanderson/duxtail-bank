import { createSlice } from '@reduxjs/toolkit';
import { portfolio } from '../accountList/accountsSlice.js';
import { filterTransactionsByAcct } from '../../utils/helpers.js';
import data from '../../../data/accountData.json';

const { transactionsData } = data;

console.log(transactionsData);

const initialState = {
  dashboardAccount: portfolio,
  filters: ['Balance', 'Deposits', 'Expenses', 'Net'],
  dashboardFilter: 'Balance',
  periods: [1, 30, 90, 180, 365],
  dashboardPeriod: 30,
  dashboardViewTransactions: transactionsData,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setDashboardAccount(state, action) {
      state.dashboardAccount = action.payload;
    },
    setDashboardFilter(state, action) {
      console.log(action.payload);
      state.dashboardFilter = action.payload;
    },
    setDashboardPeriod(state, action) {
      state.dashboardPeriod = action.payload;
    },
    setDashboardViewTransactions(state, action) {
      state.dashboardViewTransactions = action.payload;
    },
  },
});

export const {
  setDashboardAccount,
  setDashboardFilter,
  setDashboardTransactions,
  setDashboardPeriod,
  setDashboardViewTransactions,
} = dashboardSlice.actions;

export const getDashboardTransactions = (state) =>
  filterTransactionsByAcct(state.dashboardAccount);

export const dashboardAccount = (state) => state.dashboardAccount;
export const dashboardFilter = (state) => state.dashboardFilter;
export const dashboardPeriod = (state) => state.dashboardPeriod;
export const dashboardViewTransactions = (state) =>
  state.dashboardViewTransactions;
export default dashboardSlice.reducer;
