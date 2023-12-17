import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Genus from "./Genus";

function PersonalInfo() {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <div className="input-group">
        <label>פרטים אישיים</label>
        <div>
          <TextField
            margin="normal"
            sx={{ ml: 1, width: 350 }}
            // style={{ marginLeft: "10px", width: "350px" }}
            id="outlined-basic"
            label="שם מלא"
            variant="outlined"
            {...register("name", {
              required: "נא למלא שם פרטי ומשפחה",
            })}
          />
          {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
        </div>
        <TextField
          sx={{ ml: 1, mt: 4, width: 350 }}
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
        <Genus />
      </div>
    </div>
  );
}

export default PersonalInfo;
