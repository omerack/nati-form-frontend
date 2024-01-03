import React from "react";
import { TextField, Alert } from "@mui/material";
import { useFormContext } from "react-hook-form";

function Association() {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  return (
    <div>
      <div className="input-group">
        <label>שם העמותה</label>
        <TextField
          inputProps={{ dir: "rtl" }}
          margin="normal"
          style={{ marginLeft: "10px", width: "350px" }}
          id="outlined-basic"
          label="שם עמותה"
          variant="outlined"
          {...register("associationName", { required: "נא למלא שם עמותה" })}
        />
        {errors.associationName && (
          <Alert severity="error">{errors.associationName.message}</Alert>
        )}
      </div>
      <div className="input-group">
        <label>מספר העמותה</label>
        <TextField
          style={{ width: "350px" }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          id="outlined-basic"
          label="מספר עמותה"
          variant="outlined"
          {...register("id", {
            required: "נא למלא מספר עמותה",
            validate: {
              length: (fieldValue) => {
                return (
                  fieldValue.length === 9 || "מספר עמותה חייב להיות 9 ספרות"
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

export default Association;
