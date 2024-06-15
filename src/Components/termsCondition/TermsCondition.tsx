import { FC } from "react";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { Header } from "../../UI-Components/Header/Header";
interface ITermsAndConditionProps {}

export const TermsAndCondition: FC<ITermsAndConditionProps> = (props) => {
  usePageTitle("TermsAndCondition");
  return (
    <div>
      <Header />
    </div>
  );
};
