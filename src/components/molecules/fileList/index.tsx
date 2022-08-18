import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FolderIcon from "@mui/icons-material/Folder";
export interface FileListProps {}

export const FileList: FC<FileListProps> = (props) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem disablePadding secondaryAction={<Typography>500KB</Typography>}>
        <ListItemButton>
          <ListItemAvatar>
            <PictureAsPdfIcon />
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItemButton>
      </ListItem>
      <Divider />

      <ListItem disablePadding secondaryAction={<Typography>500KB</Typography>}>
        <ListItemButton>
          <ListItemAvatar>
            <FolderIcon />
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItemButton>
      </ListItem>
      <Divider />

      <ListItem disablePadding secondaryAction={<Typography>500KB</Typography>}>
        <ListItemButton>
          <ListItemAvatar>
            <PictureAsPdfIcon />
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  );
};
