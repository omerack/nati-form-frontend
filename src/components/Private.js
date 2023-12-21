import React from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useFormContext } from "react-hook-form";

function Private() {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <div className="input-group">
        <label>פרטים אישיים</label>
        <TextField
          inputProps={{ dir: "rtl" }}
          margin="normal"
          style={{ marginLeft: "10px", width: "350px" }}
          id="outlined-basic"
          label="שם פרטי"
          variant="outlined"
          {...register("name")}
        />
        <TextField
          margin="normal"
          style={{ width: "350px" }}
          id="outlined-basic"
          label="שם משפחה"
          variant="outlined"
          {...register("lastName", {
            required: "נא למלא את שם המשפחה",
          })}
        />
        {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
        {errors.lastName && (
          <Alert severity="error">{errors.lastName.message}</Alert>
        )}
      </div>
      <div className="input-group">
        <label>תעודת זהות</label>
        <TextField
          style={{ width: "350px" }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          id="outlined-basic"
          label="תעודת זהות"
          variant="outlined"
          {...register("id", {
            required: "נא למלא את תעודת הזהות",
            validate: {
              length: (fieldValue) => {
                return (
                  fieldValue.length === 9 || "תעודת הזהות חייבת להיות 9 ספרות"
                );
              },
            },
          })}
        />
        {errors.id && <Alert severity="error">{errors.id.message}</Alert>}
      </div>
    </div>
  );
}

export default Private;
