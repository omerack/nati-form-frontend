import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const getColor = (value) => {
  if (value <= 30) {
    return "#ff1744"; // Red
  } else if (value <= 80) {
    return "#ffea00"; // Yellow
  } else {
    return "#4caf50"; // Green
  }
};

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  width: 500,
  height: 30,
  borderRadius: 15,
  transform: "scale(-1, 1)",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: getColor(value),
  },
}));

function Progress({ progressValue }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={progressValue} />
    </Box>
  );
}

export default Progress;
