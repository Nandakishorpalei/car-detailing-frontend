import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useToast } from "../../Hooks/useToast";
import { useUpdateServiceMutation } from "../../store/api/serviceDetails";
import { Button } from "../../UI-Components/Button/Button";
import { FileUpload } from "../../UI-Components/FileUpload/FileUpload";
import { File } from "../../store/model/File";
import { CloseIcon } from "../../Icons/CloseIcon";

export const MarkServiceAsComplete = ({ serviceId }: { serviceId: string }) => {
  const [open, setOpen] = useState(false);
  const { alertToast, successToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [updateStatus, { isLoading }] = useUpdateServiceMutation();

  const handleSubmit = async () => {
    try {
      await updateStatus({
        serviceId,
        payload: {
          work_status: "completed",
          post_service_photos: selectedFiles as File[],
        },
      }).unwrap();
      successToast({ message: "Work status updated successfully!" });
      setOpen(false);
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <div>
      <Button
        customType="primary"
        size="small"
        block
        onClick={() => setOpen(true)}
      >
        Mark as completed
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="border-b border-neutral-10 text-h4 flex justify-between items-center">
          Mark Service As Complete
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="overflow-scroll max-h-[440px] mt-6 mb-2">
          <FileUpload
            label="Post Service Photos"
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            required
          />
        </DialogContent>
        <DialogActions className="border border-l-0 border-r-0 border-b-0 border-neutral-10 py-3 px-6">
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            customType="primary"
            isLoading={isLoading}
            disabled={isLoading || selectedFiles.length === 0}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
