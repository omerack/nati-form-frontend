import { useAuth } from "../utils/AuthContext";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

function Dashboard({ documents, setDocuments }) {
  const { listId, deleteId } = useAuth();

  useEffect(() => {
    const fetchData = async (data) => {
      const createIdResponse = await listId(data);
      setDocuments(createIdResponse.documents);
    };
    fetchData().catch(console.error);
  }, [listId, setDocuments]);

  const deleteRow = async (id) => {
    try {
      await deleteId(id);
      const createIdResponse = await listId();
      setDocuments(createIdResponse.documents);
      console.log("Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "תעודת זהות" },
    {
      field: "financialReportFee",
      headerName: "הסכם שירותי ביקורת דוחות כספיים",
      cellClassName: "BookKeepingFee",
      align: "center",
      headerAlign: "center",

      flex: 1,
    },
    {
      field: "BookKeepingFee",
      headerName: "הסכם שירותי דוח כספי",
      cellClassName: "BookKeepingFee",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "options",
      headerName: "מחק",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => deleteRow(params.row.$id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "50%", margin: "auto" }}>
      <DataGrid
        rows={documents}
        columns={columns}
        disableRowSelectionOnClick
        disablecolumSelectionOnClick
        disableColumnFilter
      />
    </Box>
  );
}

export default Dashboard;
