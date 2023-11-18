import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import Alert from "@mui/material/Alert";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function FileUpload() {
  const { setValue, register, formState } = useFormContext();
  const { errors } = formState;

  register("fileUploads", { required: "יש להוסיף את המסמכים הרלוונטים" });

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Set the entire array at once
      setValue("fileUploads", acceptedFiles);

      acceptedFiles.forEach((file, index) => {
        console.log(file);
      });
    },
    [setValue]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    inputRef,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const removeAll = () => {
    console.log("removeAll...");
    acceptedFiles.length = 0;
    setValue("fileUploads", []); // Clear the entire array
    inputRef.current.value = "";
    console.log(acceptedFiles);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>גרור את הקבצים הרצויים או לחץ ובחר את הקבצים</p>
      </div>
      {files.length > 0 && (
        <div>
          {files}
          <button onClick={removeAll}>Remove All</button>
        </div>
      )}
      {errors.fileUploads && (
        <Alert severity="error">{errors.fileUploads.message}</Alert>
      )}
    </div>
  );
}
