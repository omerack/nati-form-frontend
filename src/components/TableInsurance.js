import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function TableInsurance({ insuranceDocuments, setInsuranceDocuments }) {
  const { insuranceDeleteId, insuranceListId } = useAuth();
  useEffect(() => {
    const fetchData = async (data) => {
      const createIdResponse = await insuranceListId(data);
      setInsuranceDocuments(createIdResponse.documents);
    };
    fetchData().catch(console.error);
  }, [insuranceListId, setInsuranceDocuments]);

  const deleteInsuranceRow = async (id) => {
    try {
      await insuranceDeleteId(id);
      const createIdResponse = await insuranceListId();
      setInsuranceDocuments(createIdResponse.documents);
      console.log("Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const insuranceColumns = [
    { field: "id", headerName: "תעודת זהות", width: 100 },
    {
      field: "insuranceFee",
      headerName: "הסכם שירותי ביטוח",
      cellClassName: "insuranceFee",
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
            <IconButton onClick={() => deleteInsuranceRow(params.row.$id)}>
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
        rows={insuranceDocuments}
        columns={insuranceColumns}
        disableRowSelectionOnClick
        disablecolumSelectionOnClick
        disableColumnFilter
      />
    </Box>
  );
}

export default TableInsurance;
