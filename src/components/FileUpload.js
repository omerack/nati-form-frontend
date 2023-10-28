import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

function FileUpload() {
  const { setValue } = useFormContext();

  // const baseStyle = {
  //   flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   padding: "20px",
  //   borderWidth: 2,
  //   borderRadius: 2,
  //   borderColor: "#eeeeee",
  //   borderStyle: "dashed",
  //   backgroundColor: "#fafafa",
  //   color: "#bdbdbd",
  //   outline: "none",
  //   transition: "border .24s ease-in-out",
  // };

  // const focusedStyle = {
  //   borderColor: "#2196f3",
  // };

  // const acceptStyle = {
  //   borderColor: "#00e676",
  // };

  // const rejectStyle = {
  //   borderColor: "#ff1744",
  // };

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

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));


  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>גרור את הקבצים לכאן</p>
        ) : (
          <p>גרור את הקבצים הרצויים או לחץ ובחר את הקבצים</p>
        )}
      </div>
      {files}
    </div>
  );
}
export default FileUpload;
