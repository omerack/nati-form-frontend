import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giladNotesValue: {},
  guyNotesValue: {},
  clientStatusValue: {},
};

const handleSelectedClient = createSlice({
  name: "selectedClient",
  initialState,
  reducers: {
    giladNotes: (state, action) => {
      return {
        ...state,
        giladNotesValue: action.payload,
      };
    },
    guyNotes: (state, action) => {
      return {
        ...state,
        guyNotesValue: action.payload,
      };
    },
    clientStatus: (state, action) => {
      return {
        ...state,
        clientStatusValue: action.payload,
      };
    },
    deletedclient: (state, action) => {
      return {
        ...state,
        clientStatusValue: action.payload,
      };
    },
  },
});

export const { guyNotes, giladNotes, clientStatus } =
  handleSelectedClient.actions;

export default handleSelectedClient.reducer;
