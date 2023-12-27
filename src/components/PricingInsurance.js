import { Button, TextField, Typography, Grid, Alert } from "@mui/material";
import { useFormContext } from "react-hook-form";
import CopyToClipboard from "react-copy-to-clipboard";

function PricingInsurance({ insuranceDocuments }) {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const insuranceLink = "https://ackerman-cpa.onrender.com/insurance";

  return (
    <div>
      <div className="input-container">
        <Typography variant="h6">הסכם שירותי ביטוח</Typography>
        <TextField
          sx={{ mb: "10px" }}
          size="small"
          label="הכנס סכום לשינוי"
          {...register("insuranceFee")}
        ></TextField>
      </div>
      <div className="input-container">
        <Typography variant="h6">תעודת זהות</Typography>
        <TextField
          sx={{ mb: "10px" }}
          size="small"
          label="הכנס תעודת זהות"
          {...register("id", {
            required: "נא למלא את תעודת הזהות",
            validate: {
              length: (fieldValue) => {
                return (
                  fieldValue.length === 9 || "תעודת הזהות חייבת להיות 9 ספרות"
                );
              },
              isRegistered: (fieldValue) => {
                const isRegistered = insuranceDocuments.some((document) => {
                  if (document.id === fieldValue) {
                    return true;
                  }
                  return false;
                });
                return !isRegistered || "תעודת הזהות קיימת במערכת";
              },
            },
          })}
        ></TextField>
        {errors.id && <Alert severity="error">{errors.id.message}</Alert>}
      </div>
      <Grid container justifyContent="center" alignItems="center" marginTop={2}>
        <Button variant="contained" color="primary" type="submit">
          צור הרשמה
        </Button>
      </Grid>
      <div style={{ marginBottom: "20px" }}>
        <CopyToClipboard text={insuranceLink}>
          <Button variant="contained" color="primary">
            העתק קישור
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default PricingInsurance;
