import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function TableTaxRefund({ taxRefundDocuments, setTaxRefundDocuments }) {
  const { taxRefundListId, taxRefundDeleteId } = useAuth();

  useEffect(() => {
    const fetchData = async (data) => {
      const createIdResponse = await taxRefundListId(data);
      setTaxRefundDocuments(createIdResponse.documents);
    };
    fetchData().catch(console.error);
  }, [taxRefundListId, setTaxRefundDocuments]);

  const deleteTaxRefundRow = async (id) => {
    try {
      await taxRefundDeleteId(id);
      const createIdResponse = await taxRefundListId();
      setTaxRefundDocuments(createIdResponse.documents);
      console.log("Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const taxRefundColumns = [
    { field: "id", headerName: "תעודת זהות", width: 100 },
    {
      field: "company",
      headerName: "החברה",
      cellClassName: "company",
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
            <IconButton onClick={() => deleteTaxRefundRow(params.row.$id)}>
              <DeleteIcon variant="contained" size="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: { sm: "100%", md: "50%" }, margin: "auto" }}>
      <DataGrid
        rows={taxRefundDocuments}
        columns={taxRefundColumns}
        disableRowSelectionOnClick
        disablecolumSelectionOnClick
        disableColumnFilter
      />
    </Box>
  );
}

export default TableTaxRefund;
