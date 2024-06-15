import React from "react";
import { useGetAllUsersQuery } from "../../store/api/user";
import { Header } from "../../UI-Components/Header/Header";
import Loader from "../../UI-Components/Loader/Loader";
import Swal from "sweetalert2";
import { Button } from "../../UI-Components/Button/Button";
import { sweetAlert } from "../../utils/SweetAlert";
import { useToast } from "../../Hooks/useToast";
import { useGetFilesQuery } from "../../store/api/fileUpload";

export const Home = () => {
  const { data, isLoading, isSuccess } = useGetAllUsersQuery();
  const { alertToast, successToast } = useToast();

  const showAlert = () => {
    // sweetAlert("Showing autoclose alert")
    // alertToast({ message: "Testing error message" });
    successToast({ message: "Testing success message" });
  };

  if (!isSuccess || isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header title="Home" />
      <Button onClick={showAlert}>Show alert</Button>
      <div className="flex flex-col gap-6 p-12 h-[calc(100vh-65px)] w-screen">
        {data?.user?.map(({ firstName, lastName, email, phone }) => (
          <div className="flex justify-between shadow-card px-12 py-2">
            <div className="w-1/4">
              {firstName} {lastName}
            </div>
            <div className="w-1/4">{email}</div>
            <div className="w-1/4">{phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
