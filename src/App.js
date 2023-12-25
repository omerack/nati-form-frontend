import Form from "./pages/Form";
import Review from "./pages/Review";
import Submit from "./pages/Submit";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Insurance from "./pages/insurance/Insurance";
import PrivateRoutes from "./utils/PrivateRoutes";
import InsuranceReview from "./pages/insurance/InsuranceReview";
import InsuranceSubmit from "./pages/insurance/InsuranceSubmit";
import { AuthProvider } from "./utils/AuthContext";
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
        <Route path="login" element={<Login />} />
        <Route path="review" element={<Review />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="insurance/review" element={<InsuranceReview />} />
        <Route path="insurance/submit" element={<InsuranceSubmit />} />
        <Route element={<PrivateRoutes />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <FormProvider {...methods}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </FormProvider>
    </div>
  );
}

export default App;
