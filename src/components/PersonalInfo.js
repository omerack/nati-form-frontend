import React, { useState } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Married from "./Married";
import Alert from "@mui/material/Alert";
// import { Controller, useFormContext } from "react-hook-form";

function PersonalInfo({ register, errors }) {
  const [maritalStatus, setMaritalStatus] = useState("singal");

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  // const { control } = useFormContext();

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
          {...register("name", {
            required: "נא למלא את השם  פרטי",
          })}
        />
        {errors.name && <Alert severit="error">{errors.name.message}</Alert>}
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
          })}
        />
        {errors.id && <Alert severity="error">{errors.id.message}</Alert>}
      </div>
      {/* <div className="input-group">
        <label>תאריך לידה</label>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value = new Date() } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                format="dd/MM/yyyy"
                value={value}
                onChange={onChange}
              />
              {errors.date && (
                <Alert severity="error">{errors.date.message}</Alert>
              )}
            </LocalizationProvider>
          )}
        />
      </div> */}
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">מצב משפחתי</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          value={maritalStatus}
          onChange={handleMaritalStatusChange}
          name="radio-buttons-group"
        >
          <FormControlLabel value="singal" control={<Radio />} label="רווק" />
          <FormControlLabel value="married" control={<Radio />} label="נשוי" />
          <FormControlLabel value="divorced" control={<Radio />} label="גרוש" />
          <FormControlLabel value="widower" control={<Radio />} label="אלמן" />
          <FormControlLabel
            value="public"
            control={<Radio />}
            label="ידוע בציבור"
          />
          <FormControlLabel
            value="separated"
            control={<Radio />}
            label="פרוד"

          />
        </RadioGroup>
      </FormControl>

      {maritalStatus === "married" && (
        <Married register={register} errors={errors} />
      )}
    </div>
  );
}

export default PersonalInfo;
