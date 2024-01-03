import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

function License({ register, errors }) {
  return (
    <div className="input-group">
      <label>מספר רישיון נהיגה</label>
      <TextField
        id="outlined-basic"
        label="מספר רישיון"
        variant="outlined"
        fullWidth
        {...register("license", {
          required: "נא למלא את מספר הרישיון",
        })}
      />
        {errors.license && <Alert severity="error">{errors.license.message}</Alert>}
    </div>
  );
}

export default License;
