import { FileUploader } from "react-drag-drop-files";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
  const { control, resetField } = useFormContext();
  const uploadedImage = useWatch({ control, name: "fileUpload" });
  console.log(uploadedImage);

  return (
    <div className="input-group">
      <Controller
        control={control}
        name="fileUpload"
        render={({ field: { onChange } }) => (
          <FileUploader
            handleChange={onChange}
            name="file"
            types={fileTypes}
            multiple
            label="ניתן לבחור קובץ אחד או יותר להעלאה"
          />
        )}
      />
      {uploadedImage && <p>{uploadedImage.name}</p>}
      {uploadedImage && (
        <button onClick={() => resetField("fileUpload")}>מחיקה</button>
      )}
    </div>
  );
}

export default DragDrop;
