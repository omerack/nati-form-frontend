import React from "react";
import "../Submit.css";
import cpaLogo from "../../cpaLogo.jpg";

function Submit() {
  return (
    <div className="submit-container">
      <h2>תודה רבה, הפרטים נשלחו וניצור איתך קשר.</h2>
      <div>
        <img src={cpaLogo} alt="form" className="submit-img" />
      </div>
    </div>
  );
}

export default Submit;
