import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Forms.css";
import IdentityCheck from "./IdentityCheck";
import "./rtl.css";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";

function Forms() {
  const methods = useForm();
  const { register, control, handleSubmit, formState } = methods;
  const { errors } = formState;
  console.log(methods.getValues());

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/submit", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
            <IdentityCheck
              register={register}
              errors={errors}
              control={control}
            />
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
