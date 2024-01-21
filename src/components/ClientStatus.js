import { Box, Modal, Button } from "@mui/material";
import Progress from "./Progress";
import { useAuth } from "../utils/AuthContext";
import {
  clientStatusModal,
  clientOptionsModal,
} from "../state/modals/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

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

export default function ClientStatus() {
  const { updateClient } = useAuth();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(clientStatusModal());
    dispatch(clientOptionsModal());
  };
  const openModal = useSelector((state) => state.modals.clientStatusModalValue);
  const selectedClient = useSelector((state) => state.selectedClient.value);
  const confirmNewStatus = async () => {
    try {
      await updateClient(selectedClient.$id, selectedClient.progress + 40);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedClient.progress);
  return (
    <div>
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={style}>
          <p>
            האם אתה בטוח שברצונך לעדכן את סטטוס הלקוח ל:
            {selectedClient.progress === 20 ? (
              <label>בתהליך</label>
            ) : (
              <label>הושלם</label>
            )}
          </p>
          <Progress progressValue={selectedClient.progress + 40} />
          <br />
          <Button
            onClick={confirmNewStatus}
            variant="contained"
            color="primary"
          >
            אישור
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
