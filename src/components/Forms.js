import "./Forms.css";
import Typography from "@mui/material/Typography";
import IdentityCheck from "./IdentityCheck";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

function Forms() {
  const methods = useForm({
    defaultValues: {
      name: "עומר",
      lastName: "אקרמן",
      id: "204942049",
      phone: "0546229546",
      email: "omeracker1@gmail.com",
      street: "יהודה הלוי",
      streetNumber: "69",
      city: "נתניה",
      postalCode: "8652387",
    },
  });

  const { register, control, handleSubmit, formState } = methods;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await axios.post("https://gilad-form-backend.onrender.com/view", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      const id = data.id;
      window.location.href = `/review/${id}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
              עוסק פטור/מורשה
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
            הבא
          </Button>
        </form>
        <DevTool control={control} />
      </FormProvider>
      <form action="/submit" method="get">
        <Button type="submit" variant="contained" color="primary">
          סע
        </Button>
      </form>
    </div>
  );
}

export default Forms;
