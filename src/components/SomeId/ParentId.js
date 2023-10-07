import TextField from "@mui/material/TextField";

function ParentId() {
  return (
    <div className="input-group">
      <label>מספר זהות של אחד מההורים</label>
      <TextField
        id="outlined-basic"
        label="מספר זהות הורה"
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default ParentId;
