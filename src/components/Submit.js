import React from "react";
import "./Submit.css";
import logo from "../logo.jpg";

function Submit() {
  return (
    <div className="container">
      <h2>תודה רבה, הפרטים נשלחו וניצור איתך קשר.</h2>
      <div>
        <img src={logo} alt="form" className="img" />
      </div>
    </div>
  );
}

export default Submit;
