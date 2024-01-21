import { configureStore } from "@reduxjs/toolkit";
import handleModals from "./modals/ModalSlice";
import handleSelectedClient from "./clients/SelectedClientSlice";
import handleAllClients from "./clients/AllClientsSlice";

export const store = configureStore({
  reducer: {
    modals: handleModals,
    selectedClient: handleSelectedClient,
    clients: handleAllClients,
  },
});
