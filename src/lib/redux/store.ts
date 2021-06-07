import { configureStore } from "@reduxjs/toolkit";
import inputValuesReducer from "./slices/inputValues";
import swapTokensReducer from "./slices/swapTokens";
import walletDataReducer from "./slices/walletData";

const store = configureStore({
  reducer: {
    inputValues: inputValuesReducer,
    swapTokens: swapTokensReducer,
    walletData: walletDataReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
