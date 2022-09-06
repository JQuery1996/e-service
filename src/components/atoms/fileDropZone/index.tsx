import { Stack, SvgIcon, Typography } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { ReactComponent as sendSquare } from "assets/images/send-square.svg";
import { CSSProperties } from "react";

import { IDocumentType, IRequest } from "core/types";
import { ErrorMessage } from "../error-message";
import { useAuth } from "utils/hooks/useAuth";
import ReactAxios from "utils/axios";
import { useLoader } from "utils/hooks/useLoader";
import { useAppDispatch } from "app/hooks";
const UPLOAD_FILE_URL = process.env.REACT_APP_UPLOAD_FILE!;
// Styles For Preview File
const thumbsContainer: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
};

const thumb: CSSProperties = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: "100%",
    height: 300,
    padding: 4,
    boxSizing: "border-box",
};

const thumbInner: CSSProperties = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
};

const img: CSSProperties = {
    display: "block",
    width: "auto",
    height: "100%",
};

export interface FileDropZoneProps extends BoxProps {
    document?: IDocumentType;
    serviceRequest?: IRequest;
    setServiceRequest?: Dispatch<SetStateAction<IRequest>>;
}

export const FileDropZone: FC<FileDropZoneProps> = ({
    document,
    serviceRequest,
    setServiceRequest,
    ...props
}: FileDropZoneProps) => {
    const dispatch = useAppDispatch();
    const { authenticatedUser } = useAuth();
    const { setLoadingState } = useLoader();
    //Hooks
    const [file, setFile] = useState<any>(null);
    const onDrop = (acceptedFiles: any) => {
        acceptedFiles.forEach((acceptedFile: any) => {
            setFile(
                Object.assign(acceptedFile, {
                    preview: URL.createObjectURL(acceptedFile),
                }),
            );
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async () => {
                // Do whatever you want with the file contents
                // upload my file here
                // upload file api takes 3 paramaters
                // 1. documentImage => of type file
                // 2. DocumentTypeId => of type string
                // 3. userId => id of the current authenticated user
                const formData = new FormData();
                formData.append("documentImage", acceptedFile);
                formData.append("DocumentTypeId", document!.Id.toString());
                formData.append("userId", authenticatedUser!.Id);

                try {
                    if (!setServiceRequest) return null;
                    dispatch(setLoadingState(true));
                    const responsedDocument = await ReactAxios.post(
                        UPLOAD_FILE_URL,
                        formData,
                    );
                    if (responsedDocument.status === 200) {
                        // success case
                        setServiceRequest((currentServiceRequest) => ({
                            ...currentServiceRequest,
                            documentsIds: [
                                ...currentServiceRequest.documentsIds,
                                responsedDocument.data.Data.Id,
                            ],
                        }));
                    }
                    dispatch(setLoadingState(false));
                } catch (error) {
                    dispatch(setLoadingState(false));
                    console.log(error);
                }
                const binaryStr = reader.result;
                console.log(binaryStr);
            };
            reader.readAsArrayBuffer(acceptedFile);
        });
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: ["application/pdf", "image/png", "image/jpeg"],
        maxFiles: 1,
        onDrop,
    });
    const { t } = useTranslation();

    const thumbs: any = file && (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                {/^image/.test(file.type) ? (
                    <img
                        src={file.preview}
                        style={img}
                        // Revoke data uri after image is loaded
                        onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                        }}
                        alt="file Preview"
                    />
                ) : (
                    <iframe
                        title={file.name}
                        src={file.preview}
                        style={img}
                        // Revoke data uri after image is loaded
                        onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                        }}
                    />
                )}
            </div>
        </div>
    );

    return (
        <Box {...getRootProps()} {...props}>
            <input {...getInputProps()} />
            <Box
                sx={{
                    border: !isDragActive
                        ? "1px solid #DADFE4"
                        : "1px dashed #DADFE4",
                    borderRadius: "4px",
                    p: 2,
                    bgcolor: "background.default",
                    cursor: "pointer",
                    width: "100%",
                }}
            >
                <Stack direction="column" spacing={1}>
                    <SvgIcon
                        sx={{ height: 20, width: 20 }}
                        component={sendSquare}
                        inheritViewBox
                    />
                    {document && (
                        <Typography variant="h6" color="primary">
                            {document.Name_L2}
                        </Typography>
                    )}
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body2">
                            {t("drag_file")}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            {t("browse_files")}
                        </Typography>
                    </Stack>
                    {!file && <ErrorMessage message={t("field_is_required")} />}
                </Stack>
                <aside style={thumbsContainer}>{thumbs}</aside>
            </Box>
        </Box>
    );
};
