import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../utils/AuthContext";

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

export default function DeleteClient({ client, fetchData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { deleteClient } = useAuth();

  const handleDeleteClient = async () => {
    try {
      await deleteClient(client.$id);
      fetchData();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DeleteIcon onClick={handleOpen} style={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            בטוח שברצונך למחוק את הלקוח?
            <Button
              onClick={handleDeleteClient}
              variant="contained"
              color="primary"
            >
              אישור
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
