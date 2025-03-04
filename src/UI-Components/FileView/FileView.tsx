import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../../UI-Components/Button/Button";

export const FileViewModal = ({
  imageSrc,
  open,
  onClose,
}: {
  imageSrc: string;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={false}
    >
      <DialogTitle className="border-b border-neutral-10 flex justify-between items-center text-lg font-medium">
        File Preview
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="flex justify-center">
        <img
          src={imageSrc}
          alt="Preview"
          className="max-h-[80vh] w-auto object-contain mt-5"
        />
      </DialogContent>
    </Dialog>
  );
};
