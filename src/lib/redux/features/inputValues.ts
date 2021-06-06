import { createSlice } from "@reduxjs/toolkit";

export const inputValuesSlice = createSlice({
  name: "inputValues",
  initialState: {
    fromVal: 0.0,
    toVal: 0.0,
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
