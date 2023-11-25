import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormContext } from "react-hook-form";

function Genus() {
  const { register } = useFormContext();

  return (
    <div>
      <label style={{ marginRight: "25px", marginBottom: "15px" }}>מין</label>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
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
    </div>
  );
}

export default Genus;
