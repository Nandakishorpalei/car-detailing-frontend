import { useState } from "react";
//@ts-ignore
import NoServices from "../static/images/NoServices.png";
import { Button } from "../UI-Components/Button/Button";
import { ConditionalLink } from "../UI-Components/ConditionalLink/ConditionalLink";
import { AddService } from "../Components/AddService/AddService";

export const NoServicesYet = () => {
  const [showAddService, setShowAddService] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-96 w-full">
      <img src={NoServices} alt="NoServicesYet" className="h-36" />
      <div className="flex flex-col items-center text-center justify-center text-subtitle text-text-30 w-80 gap-4">
        <div>No Services Found!</div>
        <div>
          You haven’t done any services yet. Once you do, they will appear here.
        </div>
        <Button customType="primary" onClick={()=> setShowAddService(true)}>Add Service</Button>
      </div>
      <AddService open={showAddService} setOpen={setShowAddService} />
    </div>
  );
};
