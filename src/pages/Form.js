import "./Form.css";
import logo from "../logo.jpg";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IdentityCheck from "../components/IdentityCheck";
import PersonalInfo from "../components/PersonalInfo";
import Contact from "../components/Contact";
// import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Form() {
  const methods = useForm();

  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3001/view`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const id = data.id;
      navigate(`/review/${id}`);
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
            <Typography variant="h5" gutterBottom>
              עוסק פטור/מורשה
            </Typography>
          </div>
          <div className="section">
            <PersonalInfo register={register} errors={errors} />
          </div>
          <div className="section">
            <Contact register={register} errors={errors} />
          </div>
          <div className="input-group">
            <IdentityCheck errors={errors} register={register} />
          </div>
          <Button type="submit" variant="contained" color="primary">
            הבא
          </Button>
          {loading && <ClipLoader color="#1976d2" />}
        </form>
      </FormProvider>

      {/* <DevTool control={control} /> */}
    </>
  );
}

export default Form;
