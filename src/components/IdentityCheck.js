import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FileUpload from "./FileUpload";
import Signature from "./Signature";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useFormContext } from "react-hook-form";

export default function IdentityCheck({ client }) {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Typography variant="h6" gutterBottom>
          צרף מסמכים
        </Typography>
        <Typography variant="h7" gutterBottom>
          צרף צילום ת.ז עם ספח
        </Typography>
        <FileUpload number={1} />
        {client === "association" ? (
          <div style={{ margin: "50px 0px 0px 0px" }}>
            <Typography variant="h7" gutterBottom>
              צרף צילום חותמת העמותה
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>
              <Typography variant="h7" gutterBottom>
                יש לצלם רק את החותמת ועל רקע לבן בלבד
              </Typography>
            </div>
            <FileUpload number={2} />
          </div>
        ) : null}

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
