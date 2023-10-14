import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// import CountrySelect from "./CountrySelect";
import "./rtl.css";
import Alert from "@mui/material/Alert";

function contact({ register, errors }) {
  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          פרטי קשר
        </Typography>
        <div className="input-group">
          <label>מספר נייד</label>
          <TextField
            id="outlined-basic"
            label="מספר טלפון"
            variant="outlined"
            fullWidth
            {...register("phone", {
              required: "נא למלא את מספר הטלפון",
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
            label="someone@exaple.com"
            variant="outlined"
            fullWidth
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
        <div className="input-group">
          <label>כתובת מגורים</label>
          <TextField
            id="outlined-basic"
            label="רחוב"
            variant="outlined"
            fullWidth
            {...register("street", {
              required: "נא למלא את הרחוב",
            })}
          />
          {errors.street && (
            <Alert severity="error">{errors.street.message}</Alert>
          )}
          <TextField
            id="outlined-basic"
            label="מספר"
            variant="outlined"
            fullWidth
            {...register("streetNumber", {
              required: "נא למלא מספר בית",
              pattern: {
                value: /^[0-9]+$/,
                message: "לא מספר",
              },
            })}
          />
          {errors.streetNumber && (
            <Alert severity="error">{errors.streetNumber.message}</Alert>
          )}
          <TextField
            id="outlined-basic"
            label="עיר"
            variant="outlined"
            fullWidth
            {...register("city", {
              required: "נא למלא את שם העיר",
            })}
          />
          {errors.city && <Alert severity="error">{errors.city.message}</Alert>}
          <TextField
            id="outlined-basic"
            label="מיקוד"
            variant="outlined"
            fullWidth
            {...register("postalCode", {
              required: "נא למלא את המיקוד",
            })}
          />
          {errors.postalCode && (
            <Alert severity="error">{errors.postalCode.message}</Alert>
          )}
        </div>
        {/* <CountrySelect /> */}
      </div>
    </div>
  );
}

export default contact;
