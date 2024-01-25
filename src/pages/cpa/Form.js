import "../Form.css";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Private from "../../components/cpaForm/Private";
import FamilyState from "../../components/cpaForm/FamilyState";
// import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { Button, Alert } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Signature from "../../components/cpaForm/Signature";

function Form() {
  const methods = useForm();

  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isconfirmed, setIsConfirmed] = useState(false);
  const [client, setClient] = useState("private");

  const showAlert = () => {
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);

      await axios.post(`http://localhost:3001/submit`, data, {
        headers: {
          "Content-Type": "application/json", // Change 'multipart/form-data' to 'application/json'
        },
      });
      navigate("submit");
      console.log("success");
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
            פרטי לקוח חדש
          </Typography>
          <div className="section">
            <Private
              register={register}
              errors={errors}
              client={client}
              setClient={setClient}
            />
          </div>
          <FamilyState />
          <Signature />
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

      {/* <DevTool control={control} /> */}
    </>
  );
}

export default Form;
