import { useSelector } from "react-redux";
import { NoServicesYet } from "../../NoServicesYet/NoServicesYet";
import { useGetServicesQuery } from "../../store/api/serviceDetails";
import { RootState } from "../../store/store";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { Header } from "../../UI-Components/Header/Header";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { UserDetails } from "../UserDetails/UserDetails";

export const AllServices = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isSuccess, isError } = useGetServicesQuery(
    {},
    { skip: !isAuthenticated }
  );

  const isEmpty = Boolean(
    data?.serviceDetails && data?.serviceDetails?.length === 0
  );

  return (
    <div>
      <Header title="My Services" />
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
          <div className="bg-surface-background p-12 h-[calc(100vh-65px)] w-screen px-[15%] sm:px-[4%] overflow-auto grid sm:grid-cols-1 grid-cols-2 gap-12">
            {data?.serviceDetails?.map((service) => (
              <ServiceCard serviceDetail={service} isAdmin />
            ))}
          </div>
        </Async.Success>
      </Async.Root>
      {!isAuthenticated && <UserDetails open setOpen={() => {}} disableClose />}
    </div>
  );
};
