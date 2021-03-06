import { createSlice } from "@reduxjs/toolkit";
import { Token } from "../../types";

type TokensState = {
  fromToken: Token;
  toToken: Token;
};

const initialState: TokensState = {
  fromToken: null,
  toToken: null,
};

export const swapTokensSlice = createSlice({
  name: "swapTokens",
  initialState: initialState,
  reducers: {
    modifyFromToken: (state, action) => {
      state.fromToken = action.payload;
    },
    modifyToToken: (state, action) => {
      state.toToken = action.payload;
    },
    switchTokens: (state) => {
      const currentFromToken = state.fromToken;

      state.fromToken = state.toToken;
      state.toToken = currentFromToken;
    },
  },
});

export const { modifyFromToken, modifyToToken, switchTokens } =
  swapTokensSlice.actions;

export default swapTokensSlice.reducer;
