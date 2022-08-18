import { FC } from "react";
import {
  Dialog,
  Stack,
  Typography,
  DialogProps,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

export interface EDialogProps extends DialogProps {
  title?: string;
  subtitle?: string;
  toggle: () => void;
}

export const EDialog: FC<EDialogProps> = ({
  title,
  subtitle,
  children,
  onClose,
  toggle,
  ...props
}) => {
  //Hooks

  return (
    <Dialog dir="rtl" onClose={onClose} fullWidth {...props}>
      <DialogTitle>
        <Stack direction="row" justifyContent={"space-between"}>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography>{subtitle}</Typography>
          </Box>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
