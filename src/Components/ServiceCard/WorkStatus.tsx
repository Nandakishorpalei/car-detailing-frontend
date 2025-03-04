import { ServiceDetailsResponse } from "../../store/model/ServiceDetails";
import { MarkServiceAsComplete } from "../MarkServiceAsComplete/MarkServiceAsComplete";
import { APIButton } from "./ApiButton";

export const WorkStatus = ({
  serviceDetail,
  isAdmin = false,
}: {
  serviceDetail: ServiceDetailsResponse;
  isAdmin?: boolean;
}) => {
  switch (serviceDetail.work_status) {
    case "pending": {
      if (isAdmin) {
        return (
          <div className="flex gap-4">
            <APIButton
              type="danger"
              text="Reject"
              serviceId={serviceDetail._id}
              workStatus="rejected"
            />
            <APIButton
              type="primary"
              text="Start"
              serviceId={serviceDetail._id}
              workStatus="in_progress"
            />
          </div>
        );
      }
      return (
        <div className="border border-solid border-neutral-10 text-red-80 text-subtitle-sm bg-red-20 rounded-lg px-2 py-1 text-center">
          Pending
        </div>
      );
    }
    case "in_progress": {
      if (isAdmin) {
        return <MarkServiceAsComplete serviceId={serviceDetail._id} />;
      }
      return (
        <div className="border border-solid border-neutral-10 text-orange-80 text-subtitle-sm bg-orange-20 rounded-lg px-2 py-1 text-center">
          In Progress
        </div>
      );
    }
    case "completed": {
      return (
        <div className="border border-solid border-neutral-10 text-green-80 text-subtitle-sm bg-green-20 rounded-lg px-2 py-1 text-center">
          Completed
        </div>
      );
    }
    case "rejected": {
      return (
        <div className="border border-solid border-neutral-10 text-red-80 text-subtitle-sm bg-red-20 rounded-lg px-2 py-1 text-center">
          Rejected
        </div>
      );
    }
    default: {
      return null;
    }
  }
};
