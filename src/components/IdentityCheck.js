import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileUpload from "./FileUpload";
import Signature from "./Signature";
import Typography from "@mui/material/Typography";
import "./rtl.css";
import License from "./SomeId/License";
import ParentId from "./SomeId/ParentId";
import Passport from "./SomeId/Passport";

export default function IdentityCheck() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h5" gutterBottom>
        אימות זהות
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">בחר</InputLabel>
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
          {age === 1 && <License />}
          {age === 2 && <Passport />}
          {age === 3 && <ParentId />}
          <FileUpload />
        </div>
        <Signature />
      </FormControl>
    </Box>
  );
}
