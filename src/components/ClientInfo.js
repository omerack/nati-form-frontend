import { Typography, Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clientInfoModal } from "../state/modals/ModalSlice";

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

export default function ClientInfo() {
  const openModal = useSelector((state) => state.modals.clientInfoModalValue);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(clientInfoModal());

  const selectedClient = useSelector((state) => state.selectedClient.value);
  return (
    <div>
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={style}>
          <Typography variant="h3" component="h2">
            פרטי לקוח
          </Typography>
          {
            <>
              <Typography variant="h6" component="h2">
                שם מלא: {selectedClient.name}
              </Typography>
              <Typography variant="h6" component="h2">
                תעודת זהות: {selectedClient.id}
              </Typography>
            </>
          }
        </Box>
      </Modal>
    </div>
  );
}
