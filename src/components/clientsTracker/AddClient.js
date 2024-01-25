import {
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../utils/AuthContext";
import SelectProduct from "./SelectProduct";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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

export default function AddClient({ clients, fetchData }) {
  const { register, handleSubmit, reset, formState } = useFormContext();
  const { errors } = formState;
  const { createClient } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    const createData = async () => {
      await createClient(
        data.name,
        data.phone,
        data.demandProducts,
        data.notesGilad,
        data.id
      );
      fetchData();
      reset();
    };
    createData().catch(console.error);
    handleClose();
  };

  return (
    <div>
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
        >
          <ControlPointIcon />
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h3" component="h2">
              הוספת לקוח
            </Typography>
            <Typography variant="h6" component="h2">
              שם מלא
            </Typography>
            <TextField
              size="small"
              {...register("name", { required: "נא לרשום שם מלא" })}
            />
            {errors.name && (
              <Alert severity="error">{errors.name.message}</Alert>
            )}
            <Typography variant="h6" component="h2">
              ת.ז
            </Typography>
            <TextField
              size="small"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              id="outlined-basic"
              variant="outlined"
              {...register("id", {
                required: "נא למלא את תעודת הזהות",
                validate: {
                  length: (fieldValue) => {
                    return (
                      fieldValue.length === 9 ||
                      "תעודת הזהות חייבת להיות 9 ספרות"
                    );
                  },
                },
              })}
            />
            {errors.id && <Alert severity="error">{errors.id.message}</Alert>}
            <Typography variant="h6" component="h2">
              מספר טלפון
            </Typography>
            <TextField
              size="small"
              {...register("phone", {
                required: "נא למלא את מספר הטלפון",
                validate: {
                  length: (fieldValue) => {
                    return (
                      fieldValue.length === 10 ||
                      "מספר הטלפון חייב להיות 10 ספרות"
                    );
                  },
                  isRegistered: (fieldValue) => {
                    const isRegistered = clients.some((client) => {
                      if (client.phone === fieldValue) {
                        return true;
                      }
                      return false;
                    });
                    return !isRegistered || "הלקוח קיים במערכת";
                  },
                },
              })}
            />
            {errors.phone && (
              <Alert severity="error">{errors.phone.message}</Alert>
            )}
            <Typography variant="h6" component="h2">
              מוצרי ביטוח מבוקשים
            </Typography>
            <SelectProduct />
            {errors.demandProducts && (
              <Alert severity="error">{errors.demandProducts.message}</Alert>
            )}
            <Typography variant="h6" component="h2">
              הערות
            </Typography>
            <TextField
              label="הערות"
              multiline
              maxRows={10}
              {...register("notesGilad")}
            />
            <div>
              <Button type="submit" variant="contained" color="primary">
                הוסף
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
