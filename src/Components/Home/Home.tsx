import { useToast } from "../../Hooks/useToast";
import { useGetAllUsersQuery } from "../../store/api/user";
import { Header } from "../../UI-Components/Header/Header";
import Loader from "../../UI-Components/Loader/Loader";
import { FeaturesAndBenefits } from "./FeaturesAndBenefits";
import { HeroSection } from "./HeroSection";
import { NewsLetter } from "./NewsLetter";
import { OurServicesSection } from "./OurServicesSection";

export const Home = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const { alertToast, successToast } = useToast();

  const showAlert = () => {
    // sweetAlert("Showing autoclose alert")
    // alertToast({ message: "Testing error message" });
    successToast({ message: "Testing success message" });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header title="Home" />
      <div className="flex flex-col gap-16 w-full h-[calc(100vh-65px)] overflow-scroll">
        <HeroSection />
        <OurServicesSection isInsideServices={false} />
        <FeaturesAndBenefits />
        <NewsLetter />
      </div>
    </div>
  );
};
