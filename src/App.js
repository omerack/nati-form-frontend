import Form from "./pages/cpa/Form";
import Review from "./pages/cpa/Review";
import Submit from "./pages/cpa/Submit";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateRoutes from "./utils/PrivateRoutes";
import Insurance from "./pages/insurance/Insurance";
import InsuranceReview from "./pages/insurance/InsuranceReview";
import InsuranceSubmit from "./pages/insurance/InsuranceSubmit";
import TaxRefund from "./pages/taxRefund/TaxRefund";
import TaxRefundReview from "./pages/taxRefund/TaxRefundReview";
import TaxRefundSubmit from "./pages/taxRefund/TaxRefundSubmit";
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
        <Route path="taxRefund" element={<TaxRefund />} />
        <Route path="taxRefund/review" element={<TaxRefundReview />} />
        <Route path="taxRefund/submit" element={<TaxRefundSubmit />} />
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
