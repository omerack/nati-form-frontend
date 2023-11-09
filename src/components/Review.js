import React from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Review.css";

function Review() {
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/submit/${id}`);
      window.location.href = "/submit";
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
            width="60%"
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
