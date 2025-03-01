import React from "react";
import { Header } from "../../UI-Components/Header/Header";
import { OurServicesSection } from "../Home/OurServicesSection";
import { UserDetails } from "../UserDetails/UserDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Explore = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <Header title="Services" />
      <OurServicesSection isInsideServices />
      {!isAuthenticated && <UserDetails open setOpen={() => {}} disableClose />}
    </div>
  );
};
