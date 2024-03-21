import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* initial account state */

// Create 'portfolio' of all acccounts combined
export const portfolio = {
  accountName: 'All Accounts',
  accountNumber: '99999999',
  transactions: [],
};

const initialAccountState = {
  accounts: [],
  transactions: [],
  activeAccount: portfolio,
  status: 'idle',
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialAccountState,
  reducers: {
    setActiveAccount(state, action) {
      state.activeAccount = action.payload;
    },
    accountsLoaded(state, action) {
      state.isLoading = false;
      state.accounts = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAccounts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
  // .addCase(fetchTransactions.pending, (state, action) => {
  //   state.status = 'loading';
  // })
  // .addCase(fetchTransactions.fulfilled, (state, action) => {
  //   state.status = 'idle';
  //   state.transactions = action.payload;
  // })
  // .addCase(fetchTransactions.rejected, (state, action) => {
  //   state.status = 'error';
  //   state.error = action.error.message;
  // })
  // .addCase(postTransaction.pending, (state, action) => {
  //   state.status = 'loading';
  // })
  // .addCase(postTransaction.fulfilled, (state, action) => {
  //   state.transactions.push(action.payload);
  // })
  // .addCase(postTransaction.rejected, (state, action) => {
  //   state.status = 'error';
  //   state.error = action.error.message;
  // }),
});

const BASE_URL = 'http://localhost:9000';
const accountsEndpoint = 'accountData';
const transactionsEndpoint = 'transactionsData';

// export const postTransaction = createAsyncThunk(
//   'account/postTransaction',
//   async function (data) {
//     const response = await fetch(`${BASE_URL}/${transactionsEndpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     const res = await response.json();
//     console.log(res);
//   },
// );

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async function () {
    const response = await fetch(`${BASE_URL}/${accountsEndpoint}`);
    const data = response.json();
    return data;
  },
);

// export const fetchTransactions = createAsyncThunk(
//   'accounts/fetchTransactions',
//   async function () {
//     const response = await fetch(`${BASE_URL}/${transactionsEndpoint}`);
//     const data = response.json();
//     console.log(data);
//     return data;
//   },
// );

// export const transactions = (state) => state.transactions;

export const { accountsLoaded, setActiveAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
