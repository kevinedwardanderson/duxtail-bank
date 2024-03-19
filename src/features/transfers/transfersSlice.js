import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromAccountId: '',
  toAccountId: '',
  amount: '',
};

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    setFromAccount(state, action) {
      state.fromAccountId = action.payload;
    },
    setToAccount(state, action) {
      state.toAccountId = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
    resetTransfersState(state) {
      state = initialState;
    },
  },
});

export const { setFromAccount, setToAccount, setAmount, resetTransfersState } =
  transfersSlice.actions;
export default transfersSlice.reducer;
