import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "פנסיה",
  "השתלמות",
  "ביטוח חיים",
  "ביטוח חיים למשכנתא",
  "ביטוח בריאות",
  "ביטוח מחלות קשות",
  "חסכונות",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectProduct({
  setSelectedProducts,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const { register } = useFormContext();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const updatedPersonName =
      typeof value === "string" ? value.split(",") : value;
    setPersonName(updatedPersonName);

    if (setSelectedProducts) {
      setSelectedProducts(updatedPersonName);
    }
  };
  return (
    <div>
      <FormControl sx={{ width: 250 }}>
        <InputLabel>מוצרי ביטוח</InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              label="Chip"
              {...register(`demandProducts`, {
                required: "נא להוסיף את המוצרים הרלוונטים",
              })}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}