import { Button, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IdentityCheck from "../components/IdentityCheck";
import Private from "../components/Private";
import InsuranceLogo from "../insuranceLogo.jpg";
import { useAuth } from "../utils/AuthContext";
import { FormProvider } from "react-hook-form";

function Insurance() {
  const methods = useForm({
    defaultValues: {
      name: "עומר",
      lastName: "אקרמן",
      id: "204942049",
    },
  });
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { listId } = useAuth();
  const [isconfirmed, setIsConfirmed] = useState(false);

  const onSubmit = async (data) => {
    const { id, name, lastName } = data;

    console.log(data);
    setLoading(true);
    try {
      const listIdResponse = await listId(data);
      const found = listIdResponse.documents.some((document) => {
        if (document.id === data.id) {
          return true;
        }
        return false;
      });

      if (!found) {
        setIsConfirmed(true);
        return;
      }
      await axios.post(`http://localhost:3001/insurance/view`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(
        `/insurance/review/?id=${id}&name=${encodeURIComponent(
          name
        )}&lastName=${encodeURIComponent(lastName)}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="div-img">
        <img src={InsuranceLogo} alt="form" className="img" />
      </div>
      <FormProvider {...methods}>
        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          encType="multipart/form-data"
        >
          <Typography variant="h3" gutterBottom>
            פרטי לקוח{" "}
          </Typography>
          <div className="section">
            <Private />
          </div>

          <div className="input-group">
            <IdentityCheck />
          </div>
          <Button type="submit" variant="contained" color="primary">
            הבא
          </Button>
          {isconfirmed && (
            <Alert severity="error">
              לא קיבלת אישור אנא פנה למשרד רואי החשבון
            </Alert>
          )}
          {loading && <ClipLoader color="#1976d2" />}
        </form>
      </FormProvider>
    </>
  );
}

export default Insurance;
