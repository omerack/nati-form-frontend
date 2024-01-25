import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Tooltip } from "@mui/material";
import NotesGilad from "./NotesGilad";
import NotesGuy from "./NotesGuy";
import Chip from "@mui/material/Chip";
import EditStatus from "./EditStatus";
import DeleteClient from "./DeleteClient";
import { FilterTabs } from "./FilterTabs";
import UploadExcel from "./UploadExcel";
import { useAuth } from "../../utils/AuthContext";
import ExportToExcel from "./ExportToExcel";
import InfoIcon from "@mui/icons-material/Info";

export default function TableClients({ clients, fetchData }) {
  const [searchedClients, setSearchedClients] = useState("");
  const [selectedFilterTab, setSelectFilterTab] = useState("הכל");
  const { uploadClient, user } = useAuth();

  const handleDataLoaded = (data) => {
    addDataToAppwrite(data);
    // Add any additional processing or calls to other functions as needed
  };

  const getTitle = (date) => {
    return date !== null ? date : "אין תאריך";
  };

  const addDataToAppwrite = async (data) => {
    await Promise.all(
      data.map(async (clientData) => {
        await uploadClient(
          clientData.name,
          clientData.phone,
          // clientData.demandProducts,
          clientData.notesGilad,
          clientData.status,
          // clientData.boughtProducts,
          clientData.notesGuy,
          clientData.id
        );
      })
    );
    fetchData();
  };
  return (
    <div style={{ width: "100%" }}>
      <TextField
        placeholder="חפש את הלקוח הרצוי"
        onChange={(e) => setSearchedClients(e.target.value)}
      />
      {user.labels[0] === "admin" ? (
        <UploadExcel
          handleDataLoaded={handleDataLoaded}
          fetchData={fetchData}
        />
      ) : null}
      {user.labels[0] === "admin" ? (
        <ExportToExcel data={clients} fileName="clients" />
      ) : null}
      <FilterTabs setSelectFilterTab={setSelectFilterTab} />
      <TableContainer component={Paper} className="TableContainerFullWidth">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ת.ז</TableCell>
              <TableCell align="center">שם</TableCell>
              <TableCell align="center">טלפון</TableCell>
              <TableCell align="center">מוצרי ביטוח מבוקשים</TableCell>
              <TableCell align="center">סטטוס</TableCell>
              <TableCell align="center">מוצרי ביטוח שנסגרו</TableCell>
              <TableCell align="right">הערות גלעד</TableCell>
              <TableCell align="right">הערות גיא</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              .filter((client) => {
                if (!searchedClients && selectedFilterTab === "הכל") {
                  return true;
                }
                if (searchedClients && selectedFilterTab === "הכל") {
                  return client.name.includes(searchedClients);
                }
                if (!searchedClients && selectedFilterTab !== "הכל") {
                  return client.status === selectedFilterTab;
                }
                return (
                  client.name.includes(searchedClients) &&
                  client.status === selectedFilterTab
                );
              })
              .map((client) => (
                <TableRow key={client.phone}>
                  <TableCell align="center">{client.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {client.name}
                  </TableCell>
                  <TableCell align="right">{client.phone}</TableCell>
                  <TableCell align="center">
                    {client.demandProducts.join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    {client.status === "בהמתנה" ? (
                      <Chip
                        label="בהמתנה"
                        variant="outlined"
                        sx={{ backgroundColor: "#e9ecef", fontWeight: "bold" }}
                      />
                    ) : client.status === "בתהליך" ? (
                      <Chip
                        label="בתהליך"
                        variant="outlined"
                        sx={{
                          backgroundColor: "yellow",
                          fontWeight: "bold",
                        }}
                      />
                    ) : client.status === "הושלם" ? (
                      <Chip
                        label="הושלם"
                        variant="outlined"
                        sx={{
                          backgroundColor: "#29bf12",
                          fontWeight: "bold",
                          color: "#f8f9fa",
                        }}
                      />
                    ) : (
                      <Chip
                        label="לא נסגר"
                        variant="outlined"
                        sx={{
                          backgroundColor: "red",
                          fontWeight: "bold",
                          color: "#f8f9fa",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {client.boughtProducts.join(", ")}
                  </TableCell>
                  <TableCell align="right">
                    <NotesGilad client={client} fetchData={fetchData} />
                  </TableCell>
                  <TableCell align="right">
                    <NotesGuy client={client} fetchData={fetchData} />
                  </TableCell>
                  <TableCell align="left">
                    <EditStatus
                      client={client}
                      fetchData={fetchData}
                      style={{ cursor: "pointer" }}
                    />
                    {user.labels[0] === "admin" ? (
                      <DeleteClient
                        client={client}
                        fetchData={fetchData}
                        style={{ cursor: "pointer" }}
                      />
                    ) : null}
                    <Tooltip title={getTitle(client.date)}>
                      <InfoIcon />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
