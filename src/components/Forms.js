import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Forms.css";
import CountrySelect from "./CountrySelect";
import IdentityCheck from "./IdentityCheck";
import FileUpload from "./FileUpload";
import Signature from "./Signature";
import "./rtl.css";

function Forms() {
  const [value, setValue] = useState(null);

  return (
    <div className="form-container">
      <Typography variant="h3" gutterBottom>
        פרטי לקוח עצמאי חדש
      </Typography>
      <div className="section">
        <Typography variant="h5" gutterBottom>
          עוסק פטור מורשה
        </Typography>
      </div>
      <div className="section">
        <Typography variant="h5" gutterBottom>
          פרטים אישיים
        </Typography>
        <div className="input-group">
          <TextField
            sx={{ width: "25ch" }}
            margin="normal"
            id="outlined-basic"
            label="שם פרטי"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={{ width: "25ch" }}
            id="outlined-basic"
            label="שם משפחה"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="input-group">
          <label>מספר זהות</label>
          <TextField
            id="outlined-basic"
            label="תעודת זהות"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="input-group">
          <label>תאריך לידה</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(props) => (
                <TextField {...props} variant="outlined" />
              )}
              fullWidth
            />
          </LocalizationProvider>
        </div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">מצב משפחתי</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="singal"
            name="radio-buttons-group"
          >
            <FormControlLabel value="singal" control={<Radio />} label="רווק" />
            <FormControlLabel
              value="married"
              control={<Radio />}
              label="נשוי"
            />
            <FormControlLabel
              value="divorced"
              control={<Radio />}
              label="גרוש"
            />
            <FormControlLabel
              value="widower"
              control={<Radio />}
              label="אלמן"
            />
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="ידוע בציבור"
            />
            <FormControlLabel
              value="separated"
              control={<Radio />}
              label="פרוד"
            />
          </RadioGroup>
        </FormControl>
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
      <Typography variant="h5" gutterBottom>
        אימות זהות
      </Typography>
      <div className="input-group">
        <IdentityCheck />
      </div>
      <div>
        <FileUpload />
      </div>
      <Signature />
      <Button variant="contained" color="primary">
        שלח
      </Button>
    </div>
  );
}

export default Forms;
