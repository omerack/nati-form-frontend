import { Typography, Box, Modal, Button } from "@mui/material";
import { useAuth } from "../utils/AuthContext";
import ClientStatus from "./ClientStatus";
import { useDispatch, useSelector } from "react-redux";
import {
  clientOptionsModal,
  clientStatusModal,
} from "../state/modals/ModalSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ClientOptions({ setClients }) {
  const { deleteClient, listClient } = useAuth();
  const openModal = useSelector((state) => state.modals.clientOptionModalValue);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(clientOptionsModal());

  const selectedClient = useSelector((state) => state.selectedClient.value);
  const handleDeleteClient = async () => {
    try {
      await deleteClient(selectedClient.$id);
      const listClientResponse = await listClient();
      setClients(listClientResponse.documents);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={style}>
          <ClientStatus />
          <Typography variant="h3" component="h2">
            מה תרצה לעדכן אצל הלקוח?
          </Typography>
          {selectedClient.progress !== 100 ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(clientStatusModal())}
              >
                עדכן סטטוס
              </Button>
            </div>
          ) : null}
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteClient}
            >
              מחק לקוח
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
