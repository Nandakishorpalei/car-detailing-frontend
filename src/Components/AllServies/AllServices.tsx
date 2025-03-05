import { useSelector } from "react-redux";
import { NoServicesYet } from "../../NoServicesYet/NoServicesYet";
import { useGetServicesQuery } from "../../store/api/serviceDetails";
import { RootState } from "../../store/store";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { Header } from "../../UI-Components/Header/Header";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { UserDetails } from "../UserDetails/UserDetails";
import { useFilters } from "../../Hooks/UseFilter";
import { debounce } from "../../utils/debounce";
import { useState } from "react";
import { Search } from "../Search/Search";
import { ServicesFilter } from "../ServicesFilter/ServicesFilter";

export const AllServices = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const { values: filterValues, updateFilter } = useFilters({
    initialValue: {
      USERNAME: [] as string[],
      MODEL: [] as string[],
      COLOR: [] as string[],
      YEAR: [] as string[],
      REGISTRATION_NUMBER: [] as string[],
      WORK_STATUS: [] as string[],
    },
  });

  const filterAsArg = {
    username: filterValues.USERNAME.join(",") || null,
    color: filterValues.COLOR.join(",") || null,
    model: filterValues.MODEL.join(",") || null,
    registration_number: filterValues.REGISTRATION_NUMBER.join(",") || null,
    work_status: filterValues.WORK_STATUS.join(",") || null,
    year: filterValues.YEAR.join(",") || null,
    search: searchQuery || null,
  };

  const { data, isLoading, isSuccess, isError } = useGetServicesQuery(
    filterAsArg,
    { skip: !isAuthenticated }
  );

  const isEmpty = Boolean(
    data?.serviceDetails && data?.serviceDetails?.length === 0
  );

  const onChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  });

  return (
    <div>
      <Header title="My Services" />
      <div className="bg-surface-background p-12 pt-6 h-[calc(100vh-65px)] w-screen px-[15%] sm:px-[4%]">
        <div className="flex justify-between mb-6">
          <ServicesFilter updateFilter={updateFilter} values={filterValues} />
          <div className="t-w-1/2">
            <Search onChange={onChange} placeholder="Search" block />
          </div>
        </div>
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
            <div className="max-h-full overflow-auto grid sm:grid-cols-1 grid-cols-2 gap-12">
              {data?.serviceDetails?.map((service) => (
                <ServiceCard serviceDetail={service} isAdmin />
              ))}
            </div>
          </Async.Success>
        </Async.Root>
      </div>
      {!isAuthenticated && <UserDetails open setOpen={() => {}} disableClose />}
    </div>
  );
};
