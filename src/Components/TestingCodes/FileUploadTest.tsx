// FileUpload.tsx
import React, { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadFileMutation } from "../../store/api/fileUpload";

export const FileUpload: React.FC = () => {
  const [uploadedImg, setUploadedImg] = useState<string>();
  const [uploadFile] = useUploadFileMutation();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile({ payload: formData }).unwrap();
      console.log({ response });
      // setUploadedImg(response.file.url);

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log("File uploaded successfully:", result.file.url);
      //   // You can store the file information or handle it as needed
      // } else {
      //   console.error("File upload failed.");
      // }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp", ".avif"],
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          border: "1px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select a file</p>
      </div>
    </>
  );
};
