import "./Forms.css";
import Typography from "@mui/material/Typography";
import IdentityCheck from "./IdentityCheck";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { Button } from "@mui/material";

function Forms() {
  const methods = useForm();
  const { register, control, handleSubmit, formState } = methods;
  const { errors } = formState;
  // console.log(methods.getValues());

  const onSubmit = (data) => {
    axios.post("https://gilad-form-backend.onrender.com/submit", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
  };

  return (
    <div>
      {/* <iframe
        src="http://localhost:3001/preview/204942049"
        width="100%"
        height="600"
      ></iframe> */}
      <FormProvider {...methods}>
        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          encType="multipart/form-data"
        >
          <Typography variant="h3" gutterBottom>
            פרטי לקוח עצמאי חדש
          </Typography>
          <div className="section">
            <Typography variant="h5" gutterBottom>
              עוסק פטור מורשה
            </Typography>
          </div>
          <div className="section">
            <PersonalInfo
              register={register}
              errors={errors}
              control={control}
            />
          </div>
          <div className="section">
            <Contact register={register} errors={errors} />
          </div>
          <div className="input-group">
            <IdentityCheck errors={errors} register={register} />
          </div>

          <Button type="submit" variant="contained" color="primary">
            שלח
          </Button>
        </form>
      </FormProvider>
      <DevTool control={control} />
    </div>
  );
}

export default Forms;
