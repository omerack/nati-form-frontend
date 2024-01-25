import React from "react";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

const ExportToExcel = ({ data, fileName }) => {
  const handleExportToExcel = () => {
    // Preprocess data to flatten nested arrays
    const flattenedData = data.map((client) => ({
      ...client,
      boughtProducts: client.boughtProducts.join(", "), // Convert boughtProducts to a string
      demandProducts: client.demandProducts.join(", "), // Convert demandProducts to a string
    }));

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button variant="contained" onClick={handleExportToExcel}>
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
