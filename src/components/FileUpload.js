import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

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

export default function FileUpload(props) {
  const { setValue } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const fileContents = acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
        });
      });
      Promise.all(fileContents).then((imageContents) => {
        setValue("fileUploads", imageContents);
        console.log(imageContents);
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
    // inputRef,
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

  // const removeAll = () => {
  //   console.log("removeAll...");
  //   acceptedFiles.length = 0;
  //   acceptedFiles.splice(0, acceptedFiles.length);
  //   inputRef.current.value = "";
  //   console.log(acceptedFiles);
  // };

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
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>גרור את הקבצים הרצויים או לחץ ובחר את הקבצים</p>
      </div>
      {files}
      {/* {files.length > 0 && <button onClick={removeAll}>Remove All</button>} */}
    </div>
  );
}
