import PersonalInfo from "./components/PersonalInfo";
import Signature from "./components/Signature";
import { useForm, FormProvider } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
// import logo from "./logo.png";
import "./Form.css";

function Form() {
  const methods = useForm({
    defaultValues: {
      name: "עומר",
      lastName: "אקרמן",
      id: "204942049",
      phone: "0546229546",
      city: "תל אביב",
      street: "הנהלה",
      streetNumber: "123",
      email: "omeracker1@gmail.com",
    },
  });

  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);

      await axios.post(`https://nati-form-back.onrender.com/view`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("success");
      // const id = data.id;
      // navigate(`/review/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* <div className="div-img">
        <img src={logo} alt="form" className="img" />
      </div> */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <PersonalInfo />
            <Signature />
          </div>
          <Button type="submit" variant="contained" color="primary">
            הבא
          </Button>
          {loading && <ClipLoader color="#1976d2" />}
        </form>
      </FormProvider>
    </div>
  );
}

export default Form;
