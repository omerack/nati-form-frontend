import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const handleSelectedClient = createSlice({
  name: "selectedClient",
  initialState,
  reducers: {
    clientDetails: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { clientDetails } = handleSelectedClient.actions;

export default handleSelectedClient.reducer;
