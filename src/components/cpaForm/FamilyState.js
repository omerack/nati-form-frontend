import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormContext } from "react-hook-form";

function FamilyState() {
  const { register } = useFormContext();

  return (
    <div>
      <FormControl>
        <FormLabel>מצב משפחתי</FormLabel>
        <RadioGroup row defaultValue="female">
          <FormControlLabel
            value="female"
            control={<Radio {...register("sex")} />}
            label="נקבה"
          />
          <FormControlLabel
            value="male"
            control={<Radio {...register("sex")} />}
            label="זכר"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default FamilyState;
