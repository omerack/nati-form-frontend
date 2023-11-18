import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FileUpload from "./FileUpload";
import Signature from "./Signature";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function IdentityCheck({ errors, register }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Typography variant="h6" gutterBottom>
          צרף מסמכים
        </Typography>
        <Typography variant="h7" gutterBottom>
          נא לצרף רק קבצי pdf, png, jpg
        </Typography>
        <FileUpload />

        <Signature />
        <FormControlLabel
          style={{ padding: "50px 30px 0px 30px" }}
          control={<Checkbox defaultChecked />}
          label="אני מאשר שכל הפרטים נכונים"
          labelPlacement="start"
          {...register("checkbox", {
            validate: {
              approve: (fieldValue) => {
                return fieldValue === true || "נא לאשר שהפרטים נכונים";
              },
            },
          })}
        />
        {errors.checkbox && (
          <Alert severity="error">{errors.checkbox.message}</Alert>
        )}
      </FormControl>
    </Box>
  );
}
