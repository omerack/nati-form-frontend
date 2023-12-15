import { Typography, TextField, Button } from "@mui/material";
import "./Login.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const userInfo = { email, password };

    loginUser(userInfo);
  };

  return (
    <div className="login-container">
      <form ref={loginForm} onSubmit={handleSubmit} >
        <Typography variant="h5" gutterBottom>
          התחברות
        </Typography>
        <div>
          <label>אימייל</label>
          <TextField label="אימייל" name="email" variant="outlined" fullWidth />
        </div>
        <div>
          <label>סיסמא</label>
          <TextField
            label="סיסמא"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={{ mt: 3 }}
          >
            כניסה
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
