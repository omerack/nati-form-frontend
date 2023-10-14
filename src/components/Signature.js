import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";

function Signature() {
  const signature = useRef();
  const { setValue } = useFormContext();

  return (
    <div className="input-group">
      <label>חתימת הלקוח</label>
      <div style={{ border: "2px solid black", width: 500, height: 200 }}>
        <SignatureCanvas
          ref={signature}
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
          onEnd={() => setValue("signature", signature.current.toDataURL())}
        />
      </div>
      <Button
        onClick={() => signature.current.clear()}
        variant="contained"
        color="primary"
      >
        נקה
      </Button>
    </div>
  );
}

export default Signature;
