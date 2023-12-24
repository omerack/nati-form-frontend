import "./Form.css";
import logo from "../logo.jpg";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IdentityCheck from "../components/IdentityCheck";
import WhichClient from "../components/WhichClient";
import Contact from "../components/Contact";
// import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../utils/AuthContext";
import { Alert } from "@mui/material";

function Form() {
  const methods = useForm({
    defaultValues: {
      // associationName: "איציק בעמ",
      name: "עומר",
      lastName: "אקרמן",
      id: "204942049",
      phone: "0546229546",
      email: "omeracker1@gmail.com",
      street: "יהודה הלוי",
      streetNumber: "12",
      city: "נתניה",
    },
  });

  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { listId } = useAuth();
  const [isconfirmed, setIsConfirmed] = useState(false);
  const [client, setClient] = useState("private");

  const onSubmit = async (data) => {
    const { id, name, lastName, associationName } = data;
    setLoading(true);
    try {
      let BookKeepingFee = null;
      let financialReportFee = null;

      const listIdResponse = await listId(data);
      const found = listIdResponse.documents.some((document) => {
        if (document.id === data.id) {
          BookKeepingFee = document.BookKeepingFee;
          financialReportFee = document.financialReportFee;
          return true;
        }
        return false;
      });

      if (!found) {
        setIsConfirmed(true);
        return;
      } else {
        data.BookKeepingFee = BookKeepingFee;
        data.financialReportFee = financialReportFee;
      }
      console.log(data);

      await axios.post(`https://gilad-form-backend.onrender.com/view`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(
        `/review/?id=${id}&name=${encodeURIComponent(
          name
        )}&lastName=${encodeURIComponent(
          lastName
        )}&associationName=${encodeURIComponent(associationName)}`
      );
      console.log("success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="div-img">
        <img src={logo} alt="form" className="img" />
      </div>
      <FormProvider {...methods}>
        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          encType="multipart/form-data"
        >
          <Typography variant="h3" gutterBottom>
            פרטי לקוח חדש
          </Typography>
          <div className="section">
            <WhichClient
              register={register}
              errors={errors}
              client={client}
              setClient={setClient}
            />
          </div>
          <div className="section">
            <Contact register={register} errors={errors} />
          </div>
          <div className="input-group">
            <IdentityCheck
              errors={errors}
              register={register}
              client={client}
            />
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

      {/* <DevTool control={control} /> */}
    </>
  );
}

export default Form;
