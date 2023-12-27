import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function TableCpa({ cpaDocuments, setCpaDocuments }) {
  const { cpaListId, cpaDeleteId } = useAuth();

  useEffect(() => {
    const fetchData = async (data) => {
      const createIdResponse = await cpaListId(data);
      setCpaDocuments(createIdResponse.documents);
    };
    fetchData().catch(console.error);
  }, [cpaListId, setCpaDocuments]);

  const deleteCpaRow = async (id) => {
    try {
      await cpaDeleteId(id);
      const createIdResponse = await cpaListId();
      setCpaDocuments(createIdResponse.documents);
      console.log("Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const cpaColumns = [
    { field: "id", headerName: "תעודת זהות", width: 100 },
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
      headerName: "הסכם שירותי ניהול הנהלת חשבונות",
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
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteCpaRow(params.row.$id)}>
              <DeleteIcon variant="contained" color="primary" size="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: { sm: "100%", md: "50%" }, margin: "auto" }}>
      <DataGrid
        rows={cpaDocuments}
        columns={cpaColumns}
        disableRowSelectionOnClick
        disablecolumSelectionOnClick
        disableColumnFilter
      />
    </Box>
  );
}

export default TableCpa;
