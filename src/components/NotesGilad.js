import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";
import { TextField, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

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

export default function NotesGilad({ notes }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register } = useFormContext();

  const handleEdit = () => {
    setOpenEdit(true);
  };

  return (
    <div>
      <NotesIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {notes === null ? "אין הערות" : notes}
          </Typography>
          <EditIcon onClick={handleEdit} />
          {openEdit === true ? (
            <div>
              <TextField
                label="הערות"
                multiline
                maxRows={10}
                {...register("notesGilad")}
              />
              <Button type="submit" variant="contained" color="primary">
                אישור
              </Button>
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
