import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Forms.css";
import IdentityCheck from "./IdentityCheck";
import "./rtl.css";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";

function Forms() {
  return (
    <div className="form-container">
      <Typography variant="h3" gutterBottom>
        פרטי לקוח עצמאי חדש
      </Typography>
      <div className="section">
        <Typography variant="h5" gutterBottom>
          עוסק פטור מורשה
        </Typography>
      </div>
      <div className="section">
        <PersonalInfo />
      </div>
      <div className="section">
        <Contact />
      </div>
      <div className="input-group">
        <IdentityCheck />
      </div>

      <Button variant="contained" color="primary">
        שלח
      </Button>
    </div>
  );
}

export default Forms;
