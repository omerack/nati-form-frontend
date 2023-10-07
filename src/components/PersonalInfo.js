import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Married from "./Married"; // Import the Married component

function PersonalInfo() {
  const [value, setValue] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState("singal"); // Initialize maritalStatus state

  // Function to handle radio button change
  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        פרטים אישיים
      </Typography>
      <div className="input-group">
        <TextField
          margin="normal"
          id="outlined-basic"
          label="שם פרטי"
          variant="outlined"
          fullWidth
        />
        <TextField
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
            renderInput={(props) => <TextField {...props} variant="outlined" />}
            fullWidth
          />
        </LocalizationProvider>
      </div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">מצב משפחתי</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          value={maritalStatus} // Set the value of the radio group
          onChange={handleMaritalStatusChange} // Handle radio button change
          name="radio-buttons-group"
        >
          <FormControlLabel value="singal" control={<Radio />} label="רווק" />
          <FormControlLabel value="married" control={<Radio />} label="נשוי" />
          <FormControlLabel value="divorced" control={<Radio />} label="גרוש" />
          <FormControlLabel value="widower" control={<Radio />} label="אלמן" />
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

      {/* Conditionally render the Married component based on the selected marital status */}
      {maritalStatus === "married" && <Married />}
    </div>
  );
}

export default PersonalInfo;