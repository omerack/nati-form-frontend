import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

function ParentId({ register, errors }) {
  return (
    <div className="input-group">
      <label>מספר זהות של אחד מההורים</label>
      <TextField
        id="outlined-basic"
        label="מספר זהות הורה"
        variant="outlined"
        fullWidth
        {...register("parentId", {
          required: "נא למלא את מספר הזהות",
        })}
      />
      {errors.parentId && (
        <Alert severity="error">{errors.parentId.message}</Alert>
      )}
    </div>
  );
}

export default ParentId;
