import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FileUpload from "./FileUpload";
import Signature from "./Signature";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

// import Alert from "@mui/material/Alert";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import License from "./SomeId/License";
// import ParentId from "./SomeId/ParentId";
// import Passport from "./SomeId/Passport";
// import { useState } from "react";

export default function IdentityCheck({ errors, register }) {
  // const [age, setAge] = useState("");
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      {/* <Typography variant="h5" gutterBottom>
        אימות זהות
      </Typography> */}
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">בחר</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>מספר רישיון נהיגה בתוקף</MenuItem>
          <MenuItem value={2}>מספר דרכון בתוקף</MenuItem>
          <MenuItem value={3}>מספר זהות של אחד מההורים</MenuItem>
        </Select>
        <div>
          {age === 1 && <License register={register} errors={errors} />}
          {age === 2 && <Passport register={register} errors={errors} />}
          {age === 3 && <ParentId register={register} errors={errors} />}
        </div> */}

        <Typography variant="h6" gutterBottom>
          צרף מסמכים
        </Typography>
        <FileUpload />
        <Signature />
        <FormControlLabel
          style={{ padding: "50px 30px" }}
          value="start"
          control={<Checkbox />}
          label="אני מאשר שכל הפרטים נכונים"
          labelPlacement="start"
          {...register("checkbox", {
            pattern: {
              value: true,
              message: "נא למלא את שם המשפחה",
            },
          })}
        />
        {errors.checkbox && (
          <Alert severit="error">{errors.checkbox.message}</Alert>
        )}
      </FormControl>
    </Box>
  );
}
