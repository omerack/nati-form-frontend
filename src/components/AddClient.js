import {
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Alert,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import { addClientModal } from "../state/modals/ModalSlice";
import { useSelector, useDispatch } from "react-redux";
import SelectProduct from "../components/SelectProduct";


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

export default function AddClient({ clients, setClients }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useFormContext();
  const { errors } = formState;
  const { createClient, listClient } = useAuth();

  const closeModal = () => dispatch(addClientModal());
  const openModal = useSelector((state) => state.modals.addClientModalValue);

  const onSubmit = (data) => {
    console.log(data);
    const fetchData = async () => {
      await createClient(
        data.name,
        data.phone,
        data.demandProducts,
        data.notesGilad
      );
      const updatedClientResponse = await listClient();
      setClients(updatedClientResponse.documents);
      reset();
    };
    fetchData().catch(console.error);
    closeModal();
  };

  return (
    <div>
      <Button
        onClick={() => dispatch(addClientModal())}
        variant="contained"
        color="primary"
      >
        הוסף לקוח
      </Button>
      <Modal open={openModal} onClose={closeModal}>
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
                      "תעודת הזהות חייבת להיות 10 ספרות"
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
