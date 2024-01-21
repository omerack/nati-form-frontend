import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import NotesGilad from "./NotesGilad";
import NotesGuy from "./NotesGuy";

export default function TableClients({ clients }) {
  const [searchedClients, setSearchedClients] = useState("");
  console.log(clients);
  return (
    <div>
      <TextField
        placeholder="חפש את הלקוח הרצוי"
        onChange={(e) => setSearchedClients(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">שם</TableCell>
              <TableCell align="right">טלפון</TableCell>
              <TableCell align="right">מוצרי ביטוח מבוקשים</TableCell>
              <TableCell align="right">סטטוס</TableCell>
              <TableCell align="right">מוצרי ביטוח שנסגרו</TableCell>
              <TableCell align="right">הערות גלעד</TableCell>
              <TableCell align="right">הערות גיא</TableCell>
              <TableCell align="right">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              .filter((client) => {
                if (!searchedClients) {
                  return true;
                }
                return client.name.includes(searchedClients);
              })
              .map((client) => (
                <TableRow key={client.phone}>
                  <TableCell component="th" scope="row">
                    {client.name}
                  </TableCell>
                  <TableCell align="right">{client.phone}</TableCell>
                  <TableCell align="right">
                    {client.demandProducts.join(", ")}
                  </TableCell>
                  <TableCell align="right">{client.status}</TableCell>
                  <TableCell align="right">
                    {client.completedProducts}
                  </TableCell>
                  <TableCell align="right">
                    <NotesGilad notes={client.notesGilad} />
                  </TableCell>
                  <TableCell align="right">
                    <NotesGuy notes={client.notesGuy} />
                  </TableCell>
                  <TableCell align="right">{/* Actions go here */}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
