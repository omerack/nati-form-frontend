import { Typography, Alert, Grid, Button, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormContext, Controller } from "react-hook-form";
import CopyToClipboard from "react-copy-to-clipboard";

function PricingTaxRefund({ taxRefundDocuments }) {
  const { register, formState, control } = useFormContext();
  const { errors } = formState;

  const taxRefundLink = "https://ackerman-cpa.onrender.com/taxRefund";

  return (
    <div>
      <FormControl>
        <FormLabel>טופס של מי?</FormLabel>
        <Controller
          name="company"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="ackerman"
                control={<Radio />}
                label="ackerman"
              />
              <FormControlLabel
                value="switch"
                control={<Radio />}
                label="switch"
              />
            </RadioGroup>
          )}
        />
        <RadioGroup></RadioGroup>
      </FormControl>
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
                const isRegistered = taxRefundDocuments.some((document) => {
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
      <div>
        <CopyToClipboard text={taxRefundLink}>
          <Button variant="contained" color="primary">
            העתק קישור
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default PricingTaxRefund;
