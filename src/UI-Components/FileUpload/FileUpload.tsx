import { useDropzone } from "react-dropzone";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { Document } from "../../Icons/Document";
import { UploadFromComputer } from "../../Icons/UploadFromComputer";
import { File, LocalFile } from "../../store/model/File";
import { Button } from "../../UI-Components/Button/Button";
import classNames from "classnames";
import { useUploadFilesMutation } from "../../store/api/fileUpload";
import { useCallback } from "react";

export const FileUpload = ({
  label = "Images",
  selectedFiles,
  setSelectedFiles,
  required,
}: {
  label?: string;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  required?: boolean;
}) => {
  const [uploadFiles] = useUploadFilesMutation();

  const onDelete = (index: number) => {
    setSelectedFiles((prevSelectedFiles: File[]) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    //@ts-ignore
    acceptedFiles.forEach((file) => formData.append("files", file)); // Match "files" key

    try {
      const files = await uploadFiles({ payload: formData }).unwrap();
      console.log({ files });
      setSelectedFiles((prev: File[]) => [...prev, ...files.files]);

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

  const { open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    // @ts-ignore
    onDrop,
    maxSize: 25000000,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div>
      <div>
        <div
          className={classNames("mb-1.5 text-caption text-neutral-80", {
            "after:font-bold after:text-red after:content-['_*']": required,
          })}
        >
          {label}
        </div>
        <div
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-neutral-20 py-3 text-subtitle-sm hover:border-blue-40"
          onClick={open}
        >
          <input {...getInputProps()} {...getRootProps()} />
          <UploadFromComputer />
          Choose a file from the computer
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="text-overline text-blue">
            {selectedFiles.length} Files Selected
          </div>
          <div className="max-h-44 overflow-y-scroll flex flex-col gap-2">
            {selectedFiles.map((file: File, index: number) => (
              <div className="flex w-full justify-between gap-4 px-3 py-1 border border-solid border-blue rounded">
                <div className="text-button font-light flex items-center overflow-hidden">
                  <div className="mr-2 flex">
                    <Document />
                  </div>
                  <div className="w-11/12 truncate">{file.originalname}</div>
                </div>
                <div className="self-end">
                  <Button
                    customType="transparent"
                    onClick={(e) => onDelete(index)}
                    type="button"
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
