import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

function Passport({ register, errors }) {
  return (
    <div className="input-group">
      <label>מספר דרכון בתוקף</label>
      <TextField
        id="outlined-basic"
        label="מספר דרכון ישראלי"
        variant="outlined"
        fullWidth
        {...register("passport", {
          required: "נא למלא את מספר הדרכון",
        })}
      />
      {errors.passport && (
        <Alert severity="error">{errors.passport.message}</Alert>
      )}
    </div>
  );
}

export default Passport;
