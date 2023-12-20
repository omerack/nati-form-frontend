import { useAuth } from "../utils/AuthContext";
import { Button, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import "./Admin.css";

function Admin() {
  const { logoutUser, createId } = useAuth();
  const { register } = useFormContext();

  const handleSubmit = async (data) => {
    const createIdResponse = await createId(
      data.id,
      data.financialReportFee,
      data.BookKeepingFee
    );
    console.log(createIdResponse);
    console.log("success");
  };
  return (
    <div>
      <div className="logout-container">
        <Button onClick={logoutUser} variant="contained" color="primary">
          LogOut
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="admin-form-container">
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
        </div>
        <div className="input-container">
          <Typography variant="h5">הסכם שירות דוח כספי</Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס סכום לשינוי"
            {...register("BookKeepingFee")}
          ></TextField>
        </div>
        <div className="input-container">
          <Typography variant="h5">תעודת זהות</Typography>
          <TextField
            sx={{ mb: "10px" }}
            size="small"
            label="הכנס תעודת זהות"
            {...register("id")}
          ></TextField>
        </div>
        <Button variant="contained" color="primary" type="submit">
          צור הרשמה
        </Button>
      </form>
    </div>
  );
}

export default Admin;

/* <form
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
      </form> */
