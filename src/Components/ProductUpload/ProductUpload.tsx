import { usePageTitle } from "../../Hooks/usePageTitle";
import { Card } from "../../UI-Components/Card/Card";
import { Header } from "../../UI-Components/Header/Header";
import YourFormComponent from "./FormComponent";

export const ProductUpload = () => {
  usePageTitle("Upload Product");
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="w-screen h-[calc(100vh-65px)] flex justify-center items-center">
        <Card className="w-[800px] max-h-[calc(100%-120px)] overflow-scroll p-6">
          <YourFormComponent />
        </Card>
      </div>
    </div>
  );
};
