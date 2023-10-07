import TextField from "@mui/material/TextField";

function License() {
  return (
    <div className="input-group">
      <label>מספר רישיון נהיגה</label>
      <TextField
        id="outlined-basic"
        label="מספר רישיון"
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default License;
