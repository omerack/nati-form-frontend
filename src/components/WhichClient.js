import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Married from "./Married";
import Private from "./Private";
import Association from "./Association";

function PersonalInfo({ register, errors }) {
  const [maritalStatus, setMaritalStatus] = useState("singal");
  const [client, setClient] = useState("private");

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

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

      <FormControl>
        <FormLabel>מצב משפחתי</FormLabel>
        <RadioGroup
          row
          value={maritalStatus}
          onChange={handleMaritalStatusChange}
        >
          <FormControlLabel value="singal" control={<Radio />} label="רווק" />
          <FormControlLabel value="married" control={<Radio />} label="נשוי" />
          <FormControlLabel value="divorced" control={<Radio />} label="גרוש" />
          <FormControlLabel value="widower" control={<Radio />} label="אלמן" />
          <FormControlLabel
            value="public"
            control={<Radio />}
            label="ידוע בציבור"
          />
          <FormControlLabel
            value="separated"
            control={<Radio />}
            label="פרוד"
          />
        </RadioGroup>
      </FormControl>

      {maritalStatus === "married" && (
        <Married register={register} errors={errors} />
      )}
    </div>
  );
}

export default PersonalInfo;
