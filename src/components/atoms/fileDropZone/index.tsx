import { Stack, SvgIcon, Typography } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { ReactComponent as sendSquare } from "assets/images/send-square.svg";

export interface FileDropZoneProps extends BoxProps {}

export const FileDropZone: FC<FileDropZoneProps> = (props) => {
  //Hooks
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { t } = useTranslation();

  return (
    <Box {...getRootProps()} {...props}>
      <input {...getInputProps()} />
      <Box
        sx={{
          border: !isDragActive ? "1px solid #DADFE4" : "1px dashed #DADFE4",
          borderRadius: "4px",
          p: 2,
          bgcolor: "background.default",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={1}>
          <SvgIcon
            sx={{ height: 20, width: 20 }}
            component={sendSquare}
            inheritViewBox
          />
          <Typography variant="body2">{t("drag_file")}</Typography>
          <Typography variant="body2" color="primary">
            {t("browse_files")}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
