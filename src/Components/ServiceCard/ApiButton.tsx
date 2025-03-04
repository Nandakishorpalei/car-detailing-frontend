import { useToast } from "../../Hooks/useToast";
import { useUpdateServiceMutation } from "../../store/api/serviceDetails";
import { Button } from "../../UI-Components/Button/Button";

type APIButtonProps = {
  serviceId: string;
  workStatus: "in_progress" | "completed" | "rejected";
  text: string;
  type: "primary" | "danger";
};

export const APIButton = ({
  serviceId,
  workStatus,
  text,
  type,
}: APIButtonProps) => {
  const { alertToast, successToast } = useToast();
  const [updateStatus, { isLoading }] = useUpdateServiceMutation();

  const handleClick = async () => {
    try {
      await updateStatus({
        serviceId,
        payload: { work_status: workStatus },
      }).unwrap();
      successToast({ message: "Work status updated successfully!" });
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <Button
      customType={type}
      size="small"
      block
      onClick={handleClick}
      isLoading={isLoading}
      disabled={isLoading}
    >
      {text}
    </Button>
  );
};
