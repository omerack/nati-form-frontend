import Forms from "./components/Forms";
import Review from "./components/Review";
import Submit from "./components/Submit";
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
        <Route index element={<Forms />} />
        <Route
          path="review/:id"
          element={
            <FormProvider {...methods}>
              <Review />
            </FormProvider>
          }
        />
        <Route path="submit" element={<Submit />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
