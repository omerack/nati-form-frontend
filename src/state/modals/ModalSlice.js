import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientInfoModalValue: false,
  clientOptionModalValue: false,
  clientStatusModalValue: false,
  addClientModalValue: false,
};

const handleModals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    clientInfoModal: (state) => {
      state.clientInfoModalValue = !state.clientInfoModalValue;
    },
    clientOptionsModal: (state) => {
      state.clientOptionModalValue = !state.clientOptionModalValue;
    },
    clientStatusModal: (state) => {
      state.clientStatusModalValue = !state.clientStatusModalValue;
    },
    addClientModal: (state) => {
      state.addClientModalValue = !state.addClientModalValue;
    },
  },
});

export const {
  clientInfoModal,
  clientOptionsModal,
  clientStatusModal,
  addClientModal,
} = handleModals.actions;

export default handleModals.reducer;
