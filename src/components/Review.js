import React from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Review.css";
import { useNavigate } from "react-router-dom";

function Review() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://gilad-form-backend.onrender.com/submit/${id}`);
      navigate("/submit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="container">אנא בדוק שהפרטים שהזנת נכונים.</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <iframe
            src={`https://gilad-form-backend.onrender.com/preview/${id}`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
        <div className="container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
            style={{
              fontSize: "20px",
              width: "150px",
              height: "50px",
              margin: "30px 0px",
            }}
          >
            שלח
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Review;
