import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./features/accountList/accountsSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import transfersReducer from "./features/transfers/transfersSlice";

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    dashboard: dashboardReducer,
    transfers: transfersReducer,
  },
});

export default store;
