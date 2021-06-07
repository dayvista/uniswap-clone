import { createSlice } from "@reduxjs/toolkit";

type WalletDataState = {
  balance: string;
};

const initialState: WalletDataState = {
  balance: null,
};

export const inputValuesSlice = createSlice({
  name: "walletData",
  initialState: initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { setBalance } = inputValuesSlice.actions;

export default inputValuesSlice.reducer;
