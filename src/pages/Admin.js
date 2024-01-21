import { useAuth } from "../utils/AuthContext";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import PricingCpa from "../components/PricingCpa";
import PricingInsurance from "../components/PricingInsurance";
import PricingTaxRefund from "../components/PricingTaxRefund";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TableCpa from "../components/TableCpa";
import TableInsurance from "../components/TableInsurance";
import TableTaxRefund from "../components/TableTaxRefund";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { logoutUser, cpaCreateId, insuranceCreateId, taxRefundCreateId } =
    useAuth();
  const { handleSubmit, reset } = useFormContext();
  const [cpaDocuments, setCpaDocuments] = useState([]);
  const [insuranceDocuments, setInsuranceDocuments] = useState([]);
  const [taxRefundDocuments, setTaxRefundDocuments] = useState([]);
  const [pricing, setPricing] = useState(0);
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (data.financialReportFee) {
        const createIdResponse = await cpaCreateId(
          data.id,
          data.financialReportFee,
          data.BookKeepingFee
        );
        console.log(createIdResponse);
        console.log(cpaDocuments);
      } else if (data.insuranceFee) {
        const createIdResponse = await insuranceCreateId(
          data.id,
          data.insuranceFee
        );
        console.log(createIdResponse);
      } else {
        const createIdResponse = await taxRefundCreateId(data.id, data.company);
        console.log(createIdResponse);
      }
      reset();
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };

  const clientManagement = () => {
    Navigate("/clients");
  };

  return (
    <div>
      <div className="logout-container">
        <Button onClick={logoutUser} variant="contained" color="primary">
          התנתק
        </Button>
        <Button onClick={clientManagement} variant="contained" color="primary">
          לקוחות
        </Button>
      </div>
      <BottomNavigation
        showLabels
        value={pricing}
        onChange={(event, newValue) => {
          setPricing(newValue);
        }}
        sx={{
          // bgcolor: "#e5e5e5",
          borderRadius: 2,
          borderColor: "#212529",
          border: 1,
          m: "auto",
          width: "52.5%",
        }}
      >
        <BottomNavigationAction
          label="ראיית חשבון"
          icon={<MenuBookOutlinedIcon />}
        />
        <BottomNavigationAction
          label="ביטוח"
          icon={<VolunteerActivismOutlinedIcon />}
        />
        <BottomNavigationAction
          label="החזר מס"
          icon={<CurrencyExchangeIcon />}
        />
      </BottomNavigation>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form-container">
        {pricing === 0 ? (
          <PricingCpa cpaDocuments={cpaDocuments} />
        ) : pricing === 1 ? (
          <PricingInsurance insuranceDocuments={insuranceDocuments} />
        ) : (
          <PricingTaxRefund taxRefundDocuments={taxRefundDocuments} />
        )}
      </form>
      {pricing === 0 ? (
        <TableCpa
          cpaDocuments={cpaDocuments}
          setCpaDocuments={setCpaDocuments}
        />
      ) : pricing === 1 ? (
        <TableInsurance
          insuranceDocuments={insuranceDocuments}
          setInsuranceDocuments={setInsuranceDocuments}
        />
      ) : (
        <TableTaxRefund
          taxRefundDocuments={taxRefundDocuments}
          setTaxRefundDocuments={setTaxRefundDocuments}
        />
      )}
    </div>
  );
}

export default Admin;
