import { createSlice } from "@reduxjs/toolkit";

export const inputValuesSlice = createSlice({
  name: "inputValues",
  initialState: {
    fromVal: null,
    toVal: null,
  },
  reducers: {
    modifyFromValue: (state, action) => {
      state.fromVal = action.payload;
    },
    modifyToValue: (state, action) => {
      state.toVal = action.payload;
    },
  },
});

export const { modifyFromValue, modifyToValue } = inputValuesSlice.actions;

export default inputValuesSlice.reducer;
