import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Signature() {
  const [sign, setSign] = useState();

  const handleClear = () => {
    sign.clear();
  };

  return (
    <div className="input-group">
      <label>חתימת הלקוח</label>
      <div style={{ border: "2px solid black", width: 500, height: 200 }}>
        <SignatureCanvas
          ref={(data) => setSign(data)}
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
      </div>
      <Button onClick={handleClear} variant="contained" color="primary">
        נקה
      </Button>
    </div>
  );
}

export default Signature;
