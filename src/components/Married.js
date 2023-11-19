import React from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

function Married({ register, errors }) {
  return (
    <div>
      <div className="input-group">
        <label>שם פרטי - בן/בת זוג</label>
        <TextField
          margin="normal"
          style={{ width: "350px" }}
          id="outlined-basic"
          label="שם פרטי"
          variant="outlined"
          {...register("partnerName", {
            required: "נא למלא את שם הפרטי של בן/בת הזוג",
          })}
        />
        {errors.partnerName && (
          <Alert severity="error">{errors.partnerName.message}</Alert>
        )}
        <label>שם משפחה - בן/בת זוג</label>
        <TextField
          style={{ width: "350px" }}
          id="outlined-basic"
          label="שם משפחה"
          variant="outlined"
          {...register("partnerLastName", {
            required: "נא למלא את שם המשפחה של בן/בת הזוג",
          })}
        />
        {errors.partnerLastName && (
          <Alert severity="error">{errors.partnerLastName.message}</Alert>
        )}
      </div>
      <div className="input-group">
        <label>מספר זהות - בן/בת זוג</label>
        <TextField
          style={{ width: "350px" }}
          id="outlined-basic"
          label="תעודת זהות"
          variant="outlined"
          {...register("partnerId", {
            required: "נא למלא את תעודת הזהות של בן/בת הזוג",
            validate: {
              length: (fieldValue) => {
                return (
                  fieldValue.length === 9 || "תעודת הזהות חייבת להיות 9 ספרות"
                );
              },
            },
          })}
        />
        {errors.partnerId && (
          <Alert severity="error">{errors.partnerId.message}</Alert>
        )}
      </div>
    </div>
  );
}

export default Married;
