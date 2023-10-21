import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

function FileUpload() {
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

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ name: "fileUploads" })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {files}
    </div>
  );
}
export default FileUpload;
