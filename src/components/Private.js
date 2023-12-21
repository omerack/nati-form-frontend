import { useState } from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useFormContext } from "react-hook-form";
import Married from "./Married";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Private() {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const [maritalStatus, setMaritalStatus] = useState("singal");

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

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
      <FormControl>
        <FormLabel>מצב משפחתי</FormLabel>
        <RadioGroup
          row
          value={maritalStatus}
          onChange={handleMaritalStatusChange}
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

export default Private;
