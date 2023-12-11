import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
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
            InputProps={{  } }
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
    </div>
  );
}

export default contact;
