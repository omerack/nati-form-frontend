import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../utils/AuthContext";
import Chip from "@mui/material/Chip";
import SelectProduct from "./SelectProduct";

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

export default function EditStatus({ client, fetchData }) {
  const [openStatus, setOpenStatus] = useState(false);
  const [boughtProducts, setBoughtProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const handleStatusOpen = () => setOpenStatus(true);
  const handleStatusClose = () => setOpenStatus(false);
  const handleCloseSelectedProduct = () => setBoughtProducts(false);
  const { updateStatus, user, updateBoughtProducts, updateInfoIcon } =
    useAuth();

  const currentDate = new Date();

  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  const handleStatus = async (chipValue) => {
    try {
      if (chipValue === "הושלם") {
        setBoughtProducts(true);
      } else {
        await updateStatus(client.$id, chipValue);
      }
      await updateBoughtProducts(client.$id, null);
      await updateInfoIcon(client.$id, null);
      handleStatusClose();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      await updateStatus(client.$id, "הושלם");
      await updateBoughtProducts(client.$id, selectedProducts);
      await updateInfoIcon(client.$id, formattedDate);
      handleCloseSelectedProduct();
      handleStatusClose();
      fetchData(client);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <EditIcon onClick={handleStatusOpen} style={{ cursor: "pointer" }} />
      <Modal
        open={openStatus}
        onClose={handleStatusClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <>
              מעוניין לשנות את הסטטוס ל:
              {user.labels[0] === "admin" ? (
                <Chip
                  label="בתהליך"
                  sx={{
                    backgroundColor: "yellow",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleStatus("בתהליך")}
                />
              ) : null}
              <Chip
                label="הושלם"
                sx={{
                  backgroundColor: "#29bf12",
                  fontWeight: "bold",
                  color: "#f8f9fa",
                }}
                onClick={() => handleStatus("הושלם")}
              />
              <Chip
                label="לא נסגר"
                sx={{
                  backgroundColor: "red",
                  fontWeight: "bold",
                  color: "#f8f9fa",
                }}
                onClick={() => handleStatus("לא נסגר")}
              />
            </>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={boughtProducts}
        onClose={handleCloseSelectedProduct}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            מהם מוצרי הביטוח שנסגרו?
          </Typography>
          <SelectProduct setSelectedProducts={setSelectedProducts} />
          <Button
            onClick={onSubmit}
            type="submit"
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
