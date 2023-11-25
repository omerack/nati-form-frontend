import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Genus from "./Genus";

function PersonalInfo() {
  const { register } = useFormContext();

  return (
    <div>
      <div className="input-group">
        <label>פרטים אישיים</label>
        <TextField
          margin="normal"
          sx={{ ml: 1, mb: 4, width: 350 }}
          // style={{ marginLeft: "10px", width: "350px" }}
          id="outlined-basic"
          label="שם פרטי"
          variant="outlined"
          {...register("name", {
            required: "נא למלא את השם  פרטי",
          })}
        />
        <TextField
          margin="normal"
          sx={{ width: 350 }}
          id="outlined-basic"
          label="שם משפחה"
          variant="outlined"
          {...register("lastName", {
            required: "נא למלא את שם המשפחה",
          })}
        />
        <TextField
          sx={{ ml: 1, mb: 4, width: 350 }}
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
        <TextField
          InputProps={{}}
          style={{ width: "350px" }}
          id="outlined-basic"
          label="מספר טלפון"
          variant="outlined"
          {...register("phone", {
            required: "נא למלא את מספר הטלפון",
            validate: {
              length: (fieldValue) => {
                return (
                  fieldValue.length === 10 || "מספר הנייד חייב להיות 10 ספרות"
                );
              },
            },
          })}
        />
        <Genus />
        <label>דוא"ל</label>
        <TextField
          id="outlined-basic"
          label="someone@example.com"
          variant="outlined"
          style={{ width: "350px" }}
          {...register("email", {
            required: "נא למלא את הדואל",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "בעיה באימייל",
            },
          })}
        />
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
      </div>
    </div>
  );
}

export default PersonalInfo;
