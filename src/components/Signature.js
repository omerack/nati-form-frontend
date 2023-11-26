import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useFormContext } from "react-hook-form";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function Signature() {
  const signature = useRef();
  const { setValue, register, formState } = useFormContext();
  const { errors } = formState;

  register("signature", { required: "חובה להוסיף חתימה" });

  return (
    <div className="section">
      <label>חתימת הלקוח</label>
      <div style={{ border: "2px solid black", width: "50%", height: 100 }}>
        <SignatureCanvas
          ref={signature}
          canvasProps={{
            className: "sigCanvas",
          }}
          onEnd={() => setValue("signature", signature.current.toDataURL())}
        />
      </div>
      <Button
        onClick={() => {
          signature.current.clear();
          setValue("signature", "");
        }}
        variant="contained"
        color="primary"
      >
        נקה
      </Button>
      {errors.signature && (
        <Alert severity="error">{errors.signature.message}</Alert>
      )}
    </div>
  );
}

export default Signature;
