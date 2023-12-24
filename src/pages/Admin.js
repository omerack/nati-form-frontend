import { useAuth } from "../utils/AuthContext";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import "./Admin.css";
import Alert from "@mui/material/Alert";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

function Admin() {
  const { logoutUser, createId } = useAuth();
  const { register, formState, handleSubmit } = useFormContext();
  const { errors } = formState;
  const [documents, setDocuments] = useState([]);

  const onSubmit = async (data) => {
    try {
      const createIdResponse = await createId(
        data.id,
        data.financialReportFee,
        data.BookKeepingFee
      );
      console.log(createIdResponse);
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
      <div>
        <Button variant="contained" color="primary">
          קישור ראיית חשבון
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form-container">
        <div className="input-container">
          <Typography variant="h6">
            הסכם התקשרות שירותי ביקורת דוחות כספיים
          </Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס סכום לשינוי"
            {...register("financialReportFee")}
          ></TextField>
        </div>
        <div className="input-container">
          <Typography variant="h6">הסכם שירותי ניהול הנהלת חשבונות</Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס סכום לשינוי"
            {...register("BookKeepingFee")}
          />
        </div>
        <div className="input-container">
          <Typography variant="h6">תעודת זהות</Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס תעודת זהות"
            {...register("id", {
              required: "נא למלא את תעודת הזהות",
              validate: {
                length: (fieldValue) => {
                  return (
                    fieldValue.length === 9 || "תעודת הזהות חייבת להיות 9 ספרות"
                  );
                },
                isRegistered: (fieldValue) => {
                  const isRegistered = documents.some((document) => {
                    if (document.id === fieldValue) {
                      return true;
                    }
                    return false;
                  });
                  return !isRegistered || "תעודת הזהות קיימת במערכת";
                },
              },
            })}
          ></TextField>
          {errors.id && <Alert severity="error">{errors.id.message}</Alert>}
        </div>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Button variant="contained" color="primary" type="submit">
            צור הרשמה
          </Button>
        </Grid>
      </form>
      <Dashboard documents={documents} setDocuments={setDocuments} />
    </div>
  );
}

export default Admin;
