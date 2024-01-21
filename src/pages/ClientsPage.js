import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../utils/AuthContext";
import AddClient from "../components/AddClient";
import ClientInfo from "../components/ClientInfo";
import "./ClientsPage.css";
import ClientOptions from "../components/ClientOptions";
import { useSelector } from "react-redux";
import TableClients from "../components/TableClients";

function ClientsPage() {
  const Navigate = useNavigate();
  const { listClient, createClient } = useAuth();

  const [clients, setClients] = useState([]);
  const clientStatusModalValue = useSelector(
    (state) => state.modals.clientStatusModalValue
  );
  useEffect(() => {
    const fetchData = async () => {
      const listClientResponse = await listClient();
      setClients(listClientResponse.documents);
    };
    fetchData().catch(console.error);
  }, [listClient, setClients, createClient, clientStatusModalValue]);

  const clientManagement = () => {
    Navigate("/admin");
  };

  return (
    <div className="clients-page-container">
      <h1>לקוחות</h1>
      <AddClient clients={clients} setClients={setClients} />
      <TableClients clients={clients} />
      <ClientInfo />
      <ClientOptions setClients={setClients} />
      <Button onClick={clientManagement} variant="contained" color="primary">
        ניהול
      </Button>
    </div>
  );
}

export default ClientsPage;
