import "../Submit.css";
import InsuranceLogo from "../../insuranceLogo.jpg";

function Submit() {
  return (
    <div className="submit-container">
      <h2>תודה רבה, הפרטים נשלחו וניצור איתך קשר.</h2>
      <div>
        <img src={InsuranceLogo} alt="form" className="img" />
      </div>
    </div>
  );
}

export default Submit;
