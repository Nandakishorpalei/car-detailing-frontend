import { useDropzone } from "react-dropzone";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { Document } from "../../Icons/Document";
import { UploadFromComputer } from "../../Icons/UploadFromComputer";
import { File, LocalFile } from "../../store/model/File";
import { Button } from "../../UI-Components/Button/Button";
import classNames from "classnames";
import { useUploadFilesMutation } from "../../store/api/fileUpload";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import { SmallLoader } from "../Loader/SmallLoader";
import { FileViewModal } from "../FileView/FileView";
import ImageIcon from "@mui/icons-material/Image";

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
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();
  const [fileForView, setFileForView] = useState<string | null>(null);
  const lastFile = useRef<HTMLDivElement | null>(null);

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
      setSelectedFiles((prev: File[]) => [...prev, ...files.files]);
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

  useEffect(() => {
    if (lastFile.current) {
      lastFile.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastFile.current, selectedFiles]);

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
        {isLoading ? (
          <div className="max-h-16 max-w-full border border-dashed border-neutral-20 py-1">
            <SmallLoader />
          </div>
        ) : (
          <div
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-neutral-20 py-3 text-subtitle-sm hover:border-blue-40"
            onClick={open}
          >
            <input {...getInputProps()} {...getRootProps()} />
            <UploadFromComputer />
            Choose a file from the computer
          </div>
        )}
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="text-overline text-blue">
            {selectedFiles.length} Files Selected
          </div>
          <div className="max-h-44 overflow-y-scroll flex flex-col gap-2">
            {selectedFiles.map((file: File, index: number) => (
              <div
                key={file.key}
                ref={index === selectedFiles.length - 1 ? lastFile : null}
                className="flex w-full justify-between gap-4 px-3 py-1 border border-solid border-blue rounded cursor-pointer"
                onClick={() => setFileForView(file.location)}
              >
                <div className="text-button font-light flex items-center overflow-hidden">
                  <div className="mr-2 flex">
                    <ImageIcon />
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

      {fileForView && (
        <FileViewModal
          imageSrc={fileForView}
          open={Boolean(fileForView)}
          onClose={() => setFileForView(null)}
        />
      )}
    </div>
  );
};
