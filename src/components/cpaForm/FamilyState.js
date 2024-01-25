import Married from "./Married";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { useFormContext } from "react-hook-form";


function FamilyState() {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const [maritalStatus, setMaritalStatus] = useState("singal");

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  return (
    <div>
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

export default FamilyState;
