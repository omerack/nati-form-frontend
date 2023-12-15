import { useAuth } from "../utils/AuthContext";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import "./Admin.css";

function Admin() {
  const { logoutUser } = useAuth();
  const { register, handleSubmit } = useFormContext();
  const [iframeKey, setIframeKey] = useState(0);

  const financialReportSubmit = async (data) => {
    try {
      console.log(data);
      await axios.post(
        `https://gilad-form-backend.onrender.com/financialReport/changeFee`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIframeKey((prevKey) => prevKey + 1);
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };
  const BookKeepingSubmit = async (data) => {
    try {
      console.log(data);
      await axios.post(
        `https://gilad-form-backend.onrender.com/BookKeeping/changeFee`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIframeKey((prevKey) => prevKey + 1);
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="logout-container">
        <Button onClick={logoutUser} variant="contained" color="primary">
          LogOut
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(financialReportSubmit)}
        noValidate
        encType="multipart/form-data"
        className="form-container"
      >
        <div className="input-container">
          <Typography variant="h5">
            הסכם התקשרות שירותי ביקורת דוחות כספיים
          </Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס סכום לשינוי"
            {...register("financialReportFee")}
          ></TextField>
          <Button type="submit" variant="contained" color="primary">
            SEND
          </Button>
        </div>
        <div className="container">
          <iframe
            key={iframeKey}
            src={`https://gilad-form-backend.onrender.com/financialReport`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
      </form>
      <form
        onSubmit={handleSubmit(BookKeepingSubmit)}
        noValidate
        encType="multipart/form-data"
        className="form-container"
      >
        <div className="input-container">
          <Typography variant="h5">הסכם שירות דוח כספי טמפלט</Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס סכום לשינוי"
            {...register("BookKeepingFee")}
          ></TextField>
          <Button type="submit" variant="contained" color="primary">
            SEND
          </Button>
        </div>
        <div className="container">
          <iframe
            key={iframeKey}
            src={`https://gilad-form-backend.onrender.com/BookKeeping`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
      </form>
      <div></div>
    </div>
  );
}

export default Admin;
