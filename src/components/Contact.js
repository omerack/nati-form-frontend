import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CountrySelect from "./CountrySelect";
import "./rtl.css";

function contact() {
  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          פרטי קשר
        </Typography>
        <div className="input-group">
          <label>מספר נייד</label>
          <TextField
            id="outlined-basic"
            label="מספר טלפון"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="input-group">
          <label>דוא"ל</label>
          <TextField
            id="outlined-basic"
            label="someone@exaple.com"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="input-group">
          <label>כתובת מגורים</label>
          <TextField
            id="outlined-basic"
            label="רחוב ומספר"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="עיר"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="מיקוד"
            variant="outlined"
            fullWidth
          />
        </div>
        <CountrySelect />
      </div>
    </div>
  );
}

export default contact;
