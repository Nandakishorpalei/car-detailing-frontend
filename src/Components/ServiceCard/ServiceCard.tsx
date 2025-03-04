import React, { useState } from "react";
import { ServiceDetailsResponse } from "../../store/model/ServiceDetails";
import { Card } from "../../UI-Components/Card/Card";
import { ImageCarouselComponent } from "../../UI-Components/Carousel/ImageCarouselComponent";
import { Button } from "../../UI-Components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dayjs from "dayjs";
import { WorkStatus } from "./WorkStatus";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { DeleteServiceConfirmation } from "../DeleteServiceConfirmation/DeleteServiceConfirmation";
import { EditService } from "../EditService/EditService";
import EditIcon from "@mui/icons-material/Edit";

export const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-body text-text-30 truncate">{label}:</div>
      <div className="text-body text-text-30 truncate">{value || "-"}</div>
    </div>
  );
};

export const ServiceCard = ({
  serviceDetail,
  isAdmin = false,
}: {
  serviceDetail: ServiceDetailsResponse;
  isAdmin?: boolean;
}) => {
  const imageUrls =
    serviceDetail.post_service_photos.length > 0
      ? serviceDetail.post_service_photos.map(({ location }) => location)
      : serviceDetail.pre_service_photos.map(({ location }) => location);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isInProgress =
    serviceDetail.work_status === "in_progress" ||
    serviceDetail.work_status === "pending";

  return (
    <Card
      className="p-4 relative"
      onClick={() => window.open(`/myservices/${serviceDetail._id}`, "_blank")}
    >
      {isAdmin && isInProgress && (
        <div
          className="absolute right-[16px] top-[16px] z-10 flex gap-2"
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
      <div>
        <ImageCarouselComponent images={imageUrls} alt="file images" />
      </div>
      <div className="text-body text-text-30 truncate t-mt-2">
        {serviceDetail.car_details.registration_number} (
        {serviceDetail.car_details.year})
      </div>
      <div className="text-body text-text-30 truncate t-mt-2">
        {serviceDetail.car_details.model} ({serviceDetail.car_details.color})
      </div>
      {isAdmin && (
        <Info label="Username" value={serviceDetail.user_details.name} />
      )}
      <Info
        label="Registered At"
        value={dayjs(serviceDetail.created_at).format("MMMM D, YYYY h:mm A")}
      />
      <Info label="Phone" value={serviceDetail.user_details.phone} />
      <div className="mt-2">
        <WorkStatus isAdmin={isAdmin} serviceDetail={serviceDetail} />
      </div>
      <DeleteServiceConfirmation
        show={showDelete}
        serviceId={serviceDetail._id}
        onClose={() => setShowDelete(false)}
      />
      {serviceDetail && (
        <EditService
          service={serviceDetail}
          open={showEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </Card>
  );
};
