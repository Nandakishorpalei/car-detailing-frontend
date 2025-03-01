import { useSelector } from "react-redux";
import { Header } from "../../UI-Components/Header/Header";
import { RootState } from "../../store/store";
import { UserDetails } from "../UserDetails/UserDetails";
import { useGetServicesQuery } from "../../store/api/serviceDetails";
import { NoServicesYet } from "../../NoServicesYet/NoServicesYet";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import Loader from "../../UI-Components/Loader/Loader";
import { AddService } from "../AddService/AddService";
import { useState } from "react";
import { Button } from "../../UI-Components/Button/Button";

export const MyServices = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [showAddService, setShowAddService] = useState(false);
  const { data, isLoading } = useGetServicesQuery(
    {},
    { skip: !isAuthenticated }
  );

  if (isLoading) {
    return (
      <div>
        <Header title="My Services" />
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Header title="My Services" />
      {data?.serviceDetails && data?.serviceDetails?.length > 0 ? (
        <div className="flex flex-col bg-surface-background gap-6 p-12 h-[calc(100vh-65px)] w-screen px-[15%] sm:px-[4%]">
          <div className="flex justify-end">
            <Button
              size="small"
              customType="primary"
              onClick={() => setShowAddService(true)}
            >
              Add Service
            </Button>
          </div>
          <div className="grid sm:grid-cols-1 grid-cols-2 gap-12">
            {data?.serviceDetails.map((service) => (
              <ServiceCard serviceDetail={service} />
            ))}
          </div>
        </div>
      ) : (
        <NoServicesYet />
      )}
      {/* <OurServicesSection isInsideServices /> */}
      {!isAuthenticated && <UserDetails open setOpen={() => {}} disableClose />}
      <AddService open={showAddService} setOpen={setShowAddService} />
    </div>
  );
};
