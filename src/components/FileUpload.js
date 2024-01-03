import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Alert } from "@mui/material";

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
  color: "grey",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "70%",
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

export default function FileUpload({ number }) {
  const { setValue, register, formState } = useFormContext();
  const { errors } = formState;

  register(`fileUploads${number}`, {
    required: "יש להוסיף את המסמכים הרלוונטים",
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue(`fileUploads${number}`, acceptedFiles);

      acceptedFiles.forEach((file, index) => {});
    },
    [setValue, number]
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
    acceptedFiles.length = 0;
    setValue(`fileUploads${number}`, []);
    inputRef.current.value = "";
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
      {errors[`fileUploads${number}`] && (
        <Alert severity="error">{errors[`fileUploads${number}`].message}</Alert>
      )}
    </div>
  );
}
