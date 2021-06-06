import { configureStore } from "@reduxjs/toolkit";
import inputValuesReducer from "./features/inputValues";
import swapTokensReducer from "./features/swapTokens";

const store = configureStore({
  reducer: {
    inputValues: inputValuesReducer,
    swapTokens: swapTokensReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
