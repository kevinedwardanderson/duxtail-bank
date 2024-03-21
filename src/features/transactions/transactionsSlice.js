import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialTransactionsState = {
  transactions: [],
  currentTransaction: {},
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialTransactionsState,
  reducers: {
    setCurrentTransaction(state, action) {
      state.currentTransaction = state.transactions.filter(
        (t) => t.transactionId === action.payload,
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(postTransaction.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

const BASE_URL = 'http://localhost:9000';
const transactionsEndpoint = 'transactionsData';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async function () {
    const response = await fetch(`${BASE_URL}/${transactionsEndpoint}`);
    const data = response.json();
    return data;
  },
);

export const postTransaction = createAsyncThunk(
  'account/postTransaction',
  async function (data) {
    const response = await fetch(`${BASE_URL}/${transactionsEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
  },
);

export const { setCurrentTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
