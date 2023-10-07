import React from "react";
import TextField from "@mui/material/TextField";

function Married() {
  return (
    <div>
      <div className="input-group">
        <label>שם פרטי - בן/בת זוג</label>
        <TextField
          margin="normal"
          id="outlined-basic"
          label="שם פרטי"
          variant="outlined"
          fullWidth
        />
        <label>שם משפחה - בן/בת זוג</label>
        <TextField
          id="outlined-basic"
          label="שם משפחה"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="input-group">
        <label>מספר זהות - בן/בת זוג</label>
        <TextField
          id="outlined-basic"
          label="תעודת זהות"
          variant="outlined"
          fullWidth
        />
      </div>
    </div>
  );
}

export default Married;
