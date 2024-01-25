import { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";
import { useAuth } from "../../utils/AuthContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadExcel({ handleDataLoaded, fetchData }) {
  const [uploadStatus, setUploadStatus] = useState(null);
  const { listClient } = useAuth();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        setUploadStatus("loading");

        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Get the existing clients and convert to an array
        const existingClients = await listClient();

        const formattedData = excelData
          .slice(3) // Skip header row
          .map((row) => {
            const name = row[2]; // Assuming name is in the first column
            let id = row[1]; // Assuming ID is in the second column

            // Stop processing if name or ID is undefined
            if (name === undefined) {
              return null;
            }

            // Convert ID to string if it's an integer
            if (typeof id === "number") {
              id = id.toString();
            }

            // Remove hyphen from the phone number if it exists
            const phone = row[3] ? row[3].replace("-", "") : null;
            // Check if the phone number already exists in the existing clients
            if (
              existingClients.documents.some((client) => client.phone === phone)
            ) {
              return null;
            }

            return {
              name,
              id,
              phone,
              demandProducts: row[4], // Assuming demandProducts is in the third column
              notesGilad: row[5],
              status: row[6],
              boughtProducts: row[7],
              notesGuy: row[8],
              // Add other fields as needed
            };
          })
          .filter((data) => data !== null); // Remove the null entries

        handleDataLoaded(formattedData);
        await fetchData();
        setUploadStatus("success");
      } catch (error) {
        console.error("Error processing file:", error);
        await fetchData();
        setUploadStatus("error");
      }
    };

    reader.readAsBinaryString(file);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadStatus(null);
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange} // Handle file change event
        />
      </Button>
      <Snackbar
        open={uploadStatus === "loading"} // Display while loading
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="בתהליך..." // Loading message
      />
      <Snackbar
        open={uploadStatus === "success"}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="העלאה הסתיימה בהצלחה"
      />
      <Snackbar
        open={uploadStatus === "error"}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="ארעה שגיאה בעת העלאת הקובץ"
      />
    </div>
  );
}

export default UploadExcel;
