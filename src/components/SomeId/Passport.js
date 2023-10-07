import TextField from "@mui/material/TextField";

function Passport() {
  return (
    <div className="input-group">
      <label>מספר דרכון בתוקף</label>
      <TextField
        id="outlined-basic"
        label="מספר דרכון ישראלי"
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default Passport;
