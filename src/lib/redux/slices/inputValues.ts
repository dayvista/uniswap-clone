import { createSlice } from "@reduxjs/toolkit";

type InputValuesState = {
  fromVal: string;
  toVal: string;
};

const initialState: InputValuesState = {
  fromVal: null,
  toVal: null,
};

export const inputValuesSlice = createSlice({
  name: "inputValues",
  initialState: initialState,
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
