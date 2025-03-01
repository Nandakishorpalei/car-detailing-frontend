import React from "react";
import { ServiceDetailsResponse } from "../../store/model/ServiceDetails";
import { Card } from "../../UI-Components/Card/Card";
import { ImageCarouselComponent } from "../../UI-Components/Carousel/ImageCarouselComponent";
import { Button } from "../../UI-Components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dayjs from "dayjs";

const workStatusType = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-subtitle-sm font-bold text-text-30 truncate">
        {label}:
      </div>
      <div className="text-subtitle-sm font-bold text-text-30 truncate">
        {value || "-"}
      </div>
    </div>
  );
};

export const ServiceCard = ({
  serviceDetail,
}: {
  serviceDetail: ServiceDetailsResponse;
}) => {
  const imageUrls = serviceDetail.pre_service_photos.map(
    ({ location }) => location
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <Card
      className="p-4 max-h-[560px]"
      //   onClick={() => window.open(`/products/${product._id}`, "_blank")}
    >
      <div>
        <ImageCarouselComponent images={imageUrls} alt="file images" />
      </div>
      <div className="text-subtitle font-bold text-text-30 truncate t-mt-2">
        {serviceDetail.car_details.registration_number} (
        {serviceDetail.car_details.year})
      </div>
      <div className="text-subtitle-sm font-bold text-text-30 truncate t-mt-2">
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
      <Info label="Status" value={workStatusType[serviceDetail.work_status]} />
    </Card>
  );
};
