import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useToast } from "../../Hooks/useToast";
import { useDeleteServiceMutation } from "../../store/api/serviceDetails";
import { Button } from "../../UI-Components/Button/Button";
import { CloseIcon } from "../../Icons/CloseIcon";

export const DeleteServiceConfirmation = ({
  show,
  serviceId,
  onClose,
}: {
  show: boolean;
  serviceId: string;
  onClose: () => void;
}) => {
  const { alertToast, successToast } = useToast();
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      await deleteService({ serviceId }).unwrap();
      successToast({ message: "Service deleted successfully!" });
      onClose();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      maxWidth="xs"
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle className="border-b border-neutral-10 text-h4 flex justify-between items-center">
        Confirm Delete
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="mt-4 text-text-60 text-subtitle">
        Are you sure you want to delete this service? <br />
        <br />
        This action cannot be undone.
      </DialogContent>
      <DialogActions className="border border-l-0 border-r-0 border-b-0 border-neutral-10 py-3 px-6">
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          customType="danger"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
