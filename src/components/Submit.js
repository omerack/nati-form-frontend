import React from "react";
import "./Submit.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../logo.jpg";

function Submit() {
  const navigate = useNavigate();
  useEffect(() => {
    const timerId = setTimeout(() => {
      // Replace '/your-target-path' with the path you want to navigate to
      navigate("/");
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clear the timeout in case the component is unmounted before the timeout
    return () => clearTimeout(timerId);
  }, [navigate]);

  return (
    <div className="submit-container">
      <h2>תודה רבה, הפרטים נשלחו וניצור איתך קשר.</h2>
      <div>
        <img src={logo} alt="form" className="img" />
      </div>
    </div>
  );
}

export default Submit;
