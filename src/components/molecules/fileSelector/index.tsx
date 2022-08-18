import { Button, Stack } from "@mui/material";
import { FileDropZone } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import useBoolean from "utils/hooks/useBoolean";
import { EDialog } from "../dialog";
import { FileList } from "../fileList";

export interface FileSelectorProps {}

export const FileSelector: FC<FileSelectorProps> = ({ children, ...props }) => {
  //Hooks
  const { toggle, value: open } = useBoolean();
  const { t } = useTranslation();

  return (
    <>
      <EDialog
        open={open}
        onClose={toggle}
        toggle={toggle}
        title={t("my_files")}
        maxWidth="xs"
      >
        <FileList />
      </EDialog>
      <Stack direction={"row"}>
        <FileDropZone sx={{ flexGrow: 1 }} />
        <Button onClick={toggle} sx={{ borderRadius: "4px", ml: -1 }}>
          {t("show_my_files")}
        </Button>
      </Stack>
    </>
  );
};
