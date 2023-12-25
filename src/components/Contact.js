import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";

function Contact() {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          פרטי קשר
        </Typography>
        <div className="input-group">
          <label>מספר נייד</label>
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
          {errors.phone && (
            <Alert severity="error">{errors.phone.message}</Alert>
          )}
        </div>
        <div className="input-group">
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
          {errors.email && (
            <Alert severity="error">{errors.email.message}</Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
