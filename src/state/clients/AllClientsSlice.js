import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const handleAllClients = createSlice({
  name: "clients",
  initialState,
  reducers: {
    allClients: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { allClients } = handleAllClients.actions;

export default handleAllClients.reducer;
