import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../utils/AuthContext";
import AddClient from "../components/clientsTracker/AddClient";
import "./ClientsPage.css";
import TableClients from "../components/clientsTracker/TableClients";

function ClientsPage() {
  const { listClient, createClient, user } = useAuth();
  const [clients, setClients] = useState([]);

  const fetchData = useCallback(
    async () => {
      try {
        const listClientResponse = await listClient();
        setClients(listClientResponse.documents);
      } catch (error) {
        console.error(error);
      }
    },
    [listClient]
  );

  useEffect(() => {
    fetchData();
  }, [listClient, createClient, fetchData]);

  return (
    <div className="clients-page-container">
      <h1>לקוחות</h1>
      {user.labels[0] === "admin" ? (
        <AddClient clients={clients} fetchData={fetchData} />
      ) : null}
      <TableClients clients={clients} fetchData={fetchData} />
    </div>
  );
}

export default ClientsPage;
