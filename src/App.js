import Form from "./pages/cpa/Form";
import Submit from "./pages/cpa/Submit";
import { useForm, FormProvider } from "react-hook-form";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

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
    <div>
      <FormProvider {...methods}>
          <RouterProvider router={router} />
      </FormProvider>
    </div>
  );
}

export default App;
