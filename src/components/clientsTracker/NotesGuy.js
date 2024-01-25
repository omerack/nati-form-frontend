import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NotesIcon from "@mui/icons-material/Notes";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { TextField, Button } from "@mui/material";
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

export default function NotesGuy({ client, fetchData }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { updateGuyNotes, user } = useAuth();
  const [editGuyNote, setEditGuyNote] = useState(client.notesGuy || "");

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const editNotes = async () => {
    try {
      await updateGuyNotes(client.$id, editGuyNote);
      fetchData();
      setOpenEdit(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NotesIcon onClick={handleOpen} style={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {client.notesGuy === null ? "אין הערות" : client.notesGuy}
          </Typography>
          {user.labels[0] === "premium" ? (
            <EditNoteIcon onClick={handleEdit} style={{ cursor: "pointer" }} />
          ) : null}
          {openEdit === true && user.labels[0] === "premium" ? (
            <div>
              <TextField
                label="הערות"
                multiline
                maxRows={10}
                value={editGuyNote}
                onChange={(e) => setEditGuyNote(e.target.value)}
                size="small"
              />
              <Button onClick={editNotes} variant="contained" color="primary">
                אישור
              </Button>
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
