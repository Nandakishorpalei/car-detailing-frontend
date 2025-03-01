import { useSelector } from "react-redux";
import { Header } from "../../UI-Components/Header/Header";
import { RootState } from "../../store/store";
import { UserDetails } from "../UserDetails/UserDetails";
import { NoServicesYet } from "../../NoServicesYet/NoServicesYet";

export const AllServices = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div>
      <Header title="All Services" />
      {/* <OurServicesSection isInsideServices /> */}
      {!isAuthenticated && <UserDetails open setOpen={() => {}} disableClose />}
      <NoServicesYet />
    </div>
  );
};
