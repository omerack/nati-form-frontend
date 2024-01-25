import { Button, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IdentityCheck from "../../components/cpaForm/IdentityCheck";
import Private from "../../components/cpaForm/Private";
import { useAuth } from "../../utils/AuthContext";
import { FormProvider } from "react-hook-form";
import Contact from "../../components/cpaForm/Contact";

function TaxRefund() {
  const methods = useForm();

  // {
  //   defaultValues: {
  //     name: "עומר",
  //     lastName: "אקרמן",
  //     id: "204942049",
  //     phone: "0546229546",
  //     email: "omeracker1@gmail.com",
  //   },
  // }

  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { taxRefundListId } = useAuth();
  const [isconfirmed, setIsConfirmed] = useState(false);

  const showAlert = () => {
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const onSubmit = async (data) => {
    const { id, name, lastName } = data;
    console.log(data);
    setLoading(true);
    try {
      let company = null;

      const listIdResponse = await taxRefundListId(data);
      const found = listIdResponse.documents.some((document) => {
        if (document.id === data.id) {
          company = document.company;
          return true;
        }
        return false;
      });

      if (!found) {
        setIsConfirmed(true);
        return;
      } else {
        data.company = company;
      }
      await axios.post(
        `https://gilad-form-backend.onrender.com/taxRefund/view`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(
        `/taxRefund/review/?id=${id}&name=${encodeURIComponent(
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
      <FormProvider {...methods}>
        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          encType="multipart/form-data"
        >
          <Typography variant="h3" gutterBottom>
            פרטי לקוח
          </Typography>
          <div className="section">
            <Private />
            <Contact />
          </div>
          <div className="input-group">
            <IdentityCheck />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={showAlert}
          >
            הבא
          </Button>
          {isconfirmed && (
            <Alert severity="error">לא קיבלת אישור אנא פנה למשרד</Alert>
          )}
          {loading && <ClipLoader color="#1976d2" />}
        </form>
      </FormProvider>
    </>
  );
}

export default TaxRefund;
