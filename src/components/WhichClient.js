import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Private from "./Private";
import Association from "./Association";

function PersonalInfo() {
  const [client, setClient] = useState("private");



  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <FormLabel>בחר סוג לקוח</FormLabel>
        <RadioGroup
          value={client}
          row
          onChange={handleClientChange}
          name="radio-buttons-group"
        >
          <FormControlLabel value="private" control={<Radio />} label="פרטי" />
          <FormControlLabel
            value="association"
            control={<Radio />}
            label="עמותה"
          />
        </RadioGroup>
      </FormControl>
      {client === "private" ? <Private /> : <Association />}
    </div>
  );
}

export default PersonalInfo;
