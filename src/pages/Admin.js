import { useAuth } from "../utils/AuthContext";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Admin.css";

function Admin() {
  const { logoutUser } = useAuth();
  const { register, handleSubmit } = useFormContext();
  const [iframeKey, setIframeKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const financialReportSubmit = async (data) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const BookKeepingSubmit = async (data) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        className="admin-form-container"
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
          {loading && <ClipLoader color="#1976d2" />}
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
        className="admin-form-container"
      >
        <div className="input-container">
          <Typography variant="h5">הסכם שירות דוח כספי טמפלט</Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס סכום לשינוי"
            {...register("BookKeepingFee")}
          ></TextField>
          {loading && <ClipLoader color="#1976d2" />}
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
