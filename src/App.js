import Form from "./Form";
import Submit from "./Submit";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

function App() {
  const methods = useForm();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Form />} />
        <Route path="submit" element={<Submit />} />
      </Route>
    )
  );
  return (
    <FormProvider {...methods}>
      <RouterProvider router={router} />
    </FormProvider>
  );
}

export default App;
