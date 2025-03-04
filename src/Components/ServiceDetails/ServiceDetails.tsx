import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../../store/api/serviceDetails";
import { Header } from "../../UI-Components/Header/Header";
import Async from "../../UI-Components/Async/Async";
import { NoServicesYet } from "../../NoServicesYet/NoServicesYet";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dayjs from "dayjs";
import { WorkStatus } from "../ServiceCard/WorkStatus";
import { FileViewModal } from "../../UI-Components/FileView/FileView";
import { Button } from "../../UI-Components/Button/Button";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { DeleteServiceConfirmation } from "../DeleteServiceConfirmation/DeleteServiceConfirmation";
import EditIcon from "@mui/icons-material/Edit";
import { EditService } from "../EditService/EditService";

const DetailsInfo = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-body-lg text-text-30 truncate">{label}:</div>
      <div className="text-body-lg text-text-60 truncate">{value || "-"}</div>
    </div>
  );
};

export const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [fileForView, setFileForView] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { data, isLoading, isError, isSuccess } = useGetServiceByIdQuery(
    { serviceId: id! },
    { skip: !id }
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === "admin";
  const isInProgress =
    data?.serviceDetails.work_status === "in_progress" ||
    data?.serviceDetails.work_status === "pending";

  const isEmpty = Boolean(!data?.serviceDetails);

  return (
    <div>
      <Header title="Service Details" />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={isEmpty}
      >
        <Async.Empty>
          <NoServicesYet />
        </Async.Empty>
        <Async.ErrorHandler>
          <ErrorScreen />
        </Async.ErrorHandler>
        <Async.Success>
          <div className="bg-surface-background p-12 h-[calc(100vh-65px)] w-screen px-[15%] sm:px-[4%] overflow-auto flex sm:flex-col-reverse gap-12">
            <div className="md:h-full md:overflow-auto">
              {data?.serviceDetails.post_service_photos &&
                data?.serviceDetails.post_service_photos.length > 0 && (
                  <div className="space-y-6 mb-12">
                    <div className="text-h5 text-text-60">
                      Post Service Photos
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {data?.serviceDetails.post_service_photos?.map(
                        (image) => {
                          return (
                            <img
                              className="h-64 object-contain cursor-pointer"
                              src={image.location}
                              alt="service"
                              onClick={() => setFileForView(image.location)}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              {data?.serviceDetails.pre_service_photos &&
                data?.serviceDetails.pre_service_photos.length > 0 && (
                  <div className="space-y-6">
                    <div className="text-h5 text-text-60">
                      Pre Service Photos
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {data?.serviceDetails.pre_service_photos?.map((image) => {
                        return (
                          <img
                            className="h-64 object-contain cursor-pointer"
                            src={image.location}
                            alt="service"
                            onClick={() => setFileForView(image.location)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
            <div className="mt-[52px] sm:mt-0 space-y-2 relative">
              {isAdmin && isInProgress && (
                <div
                  className="absolute right-[6px] -top-[52px] sm:-top-[24px] z-10 flex gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Button
                    customType="icon"
                    size="small"
                    onClick={() => setShowEdit(true)}
                    type="button"
                  >
                    <EditIcon fontSize="small" htmlColor="" />
                  </Button>
                  <Button
                    customType="icon"
                    size="small"
                    onClick={() => setShowDelete(true)}
                    type="button"
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              )}
              <DetailsInfo
                label="Registration Number"
                value={data?.serviceDetails.car_details.registration_number}
              />
              <DetailsInfo
                label="Registration Year"
                value={data?.serviceDetails.car_details.year}
              />
              <DetailsInfo
                label="Model"
                value={data?.serviceDetails.car_details.model}
              />
              <DetailsInfo
                label="Colour"
                value={data?.serviceDetails.car_details.color}
              />
              {isAdmin && (
                <DetailsInfo
                  label="Username"
                  value={data?.serviceDetails.user_details.name || ""}
                />
              )}
              <DetailsInfo
                label="Registered At"
                value={dayjs(data?.serviceDetails.created_at).format(
                  "MMMM D, YYYY h:mm A"
                )}
              />
              <DetailsInfo
                label="Phone"
                value={data?.serviceDetails.user_details.phone || ""}
              />
              <div className="mt-2">
                <WorkStatus
                  isAdmin={isAdmin}
                  serviceDetail={data?.serviceDetails!}
                />
              </div>
            </div>
          </div>
          {fileForView && (
            <FileViewModal
              imageSrc={fileForView}
              open={Boolean(fileForView)}
              onClose={() => setFileForView(null)}
            />
          )}
          {data?.serviceDetails._id && (
            <DeleteServiceConfirmation
              show={showDelete}
              serviceId={data?.serviceDetails._id}
              onClose={() => setShowDelete(false)}
            />
          )}
          {data?.serviceDetails && (
            <EditService
              service={data.serviceDetails}
              open={showEdit}
              onClose={() => setShowEdit(false)}
            />
          )}
        </Async.Success>
      </Async.Root>
    </div>
  );
};
