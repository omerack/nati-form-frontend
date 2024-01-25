import { TextField, Alert } from "@mui/material";
import { useFormContext } from "react-hook-form";

function Adress() {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  return (
    <div>
      <div className="input-group">
        <label style={{ margin: "25px 0" }}>כתובת מגורים</label>
        <TextField
          style={{ width: "300px", marginLeft: "10px", marginBottom: "20px" }}
          id="outlined-basic"
          label="רחוב"
          variant="outlined"
          {...register("street", {
            required: "נא למלא את הרחוב",
          })}
        />
        <TextField
          style={{ width: "100px", marginLeft: "20px" }}
          id="outlined-basic"
          label="מספר"
          variant="outlined"
          {...register("streetNumber", {
            required: "נא למלא מספר בית",
            pattern: {
              value: /^[0-9]+$/,
              message: "לא מספר",
            },
          })}
        />
        <TextField
          style={{ width: "200px" }}
          id="outlined-basic"
          label="עיר"
          variant="outlined"
          fullWidth
          {...register("city", {
            required: "נא למלא את שם העיר",
          })}
        />
        {errors.street && (
          <Alert severity="error">{errors.street.message}</Alert>
        )}
        {errors.city && <Alert severity="error">{errors.city.message}</Alert>}
        {errors.streetNumber && (
          <Alert severity="error">{errors.streetNumber.message}</Alert>
        )}
      </div>
    </div>
  );
}

export default Adress;
