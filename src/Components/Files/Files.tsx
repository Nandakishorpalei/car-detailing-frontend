import React from "react";
import { useToast } from "../../Hooks/useToast";
import {
  useDeleteFileMutation,
  useGetFilesQuery,
} from "../../store/api/fileUpload";
import { Header } from "../../UI-Components/Header/Header";
import Loader from "../../UI-Components/Loader/Loader";
import { FileUpload } from "../TestingCodes/FileUploadTest";

export const Files = () => {
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const { data: files = { data: [] }, isLoading: isFilesLoading } =
    useGetFilesQuery();
  const { alertToast, successToast } = useToast();

  const deleteFileById = async (id: string) => {
    try {
      await deleteFile({ fileId: id });
    } catch (e: any) {
      alertToast({ message: e.message });
    }
  };

  if (isFilesLoading || isDeleting) {
    return <Loader />;
  }
  return (
    <div>
      <Header title="Product" />
      <div className="grid grid-cols-2 gap-4 mx-auto w-4/5">
        {files.data.map(({ url, _id }) => (
          <img
            onDoubleClick={() => deleteFileById(_id)}
            className="h-72 transition-transform transform hover:scale-150"
            src={url}
            alt="url"
          />
        ))}
        <FileUpload />
      </div>
    </div>
  );
};
