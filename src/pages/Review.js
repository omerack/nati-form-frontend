import { Button } from "@mui/material";
import axios from "axios";
import "./Review.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Review() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let name = params.get("name");
  let lastName = params.get("lastName");
  let associationName = params.get("associationName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:3001/submit`, {
        id,
        name,
        lastName,
        associationName,
      });
      navigate("/submit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="container">אנא בדוק שהפרטים שהזנת נכונים</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <iframe
            src={`http://localhost:3001/preview/${id}`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
        <div className="container">
          <iframe
            src={`http://localhost:3001/bituahLeumi/${id}`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
        <div className="container">
          <iframe
            src={`http://localhost:3001/agreement/${id}`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
        <div className="container">
          <iframe
            src={`http://localhost:3001/financialReport/${id}`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
        <div className="container">
          <iframe
            src={`http://localhost:3001/BookKeeping/${id}`}
            width="80%"
            height="700"
            title="form review"
          ></iframe>
        </div>
        <h2 className="container">אנא בדוק שהפרטים שהזנת נכונים</h2>
        <div className="container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontSize: "20px",
              width: "150px",
              height: "50px",
              margin: "25px 0px",
            }}
          >
            שלח
          </Button>
          {loading && <ClipLoader color="#1976d2" />}
        </div>
      </form>
    </div>
  );
}

export default Review;
