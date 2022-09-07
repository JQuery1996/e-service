import { Stack, SvgIcon, Typography } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { ReactComponent as sendSquare } from "assets/images/send-square.svg";
import { CSSProperties } from "react";
import { IDocumentType } from "core/types";
import { ErrorMessage } from "../error-message";
import { useAuth } from "utils/hooks/useAuth";
import ReactAxios from "utils/axios";
import { Loader } from "features/loader/Loader";
import { notify } from "utils/toastify-notification";
// FETCH_UPLOAD_URL_FROM_ENV_FILE
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
    uploadedFiles?: { DocumentType: number; Id: number }[];
    setUploadedFiles?: Dispatch<
        SetStateAction<{ DocumentType: number; Id: number }[]>
    >;
}

export const FileDropZone: FC<FileDropZoneProps> = ({
    document,
    uploadedFiles,
    setUploadedFiles,
    ...props
}: FileDropZoneProps) => {
    const { authenticatedUser } = useAuth();
    //Hooks
    const [file, setFile] = useState<any>(null);
    const [fileLoader, setFileLoader] = useState<boolean>(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: ["application/pdf", "image/png", "image/jpeg", "image/jpg"],
        maxFiles: 1,
        maxSize: 5e6,
        onDrop,
    });
    const { t } = useTranslation();

    async function onDrop(acceptedFiles: any) {
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
                    if (!setUploadedFiles) return null;
                    setFileLoader(true);
                    const responsedDocument = await ReactAxios.post(
                        UPLOAD_FILE_URL,
                        formData,
                    );
                    if (responsedDocument.data.Code === 200) {
                        notify("success", t("upload_file_success"));
                        // success case
                        setUploadedFiles((currentUploadedFiles) => {
                            const index = currentUploadedFiles.findIndex(
                                (uploadedFile) =>
                                    uploadedFile.DocumentType ===
                                    responsedDocument.data.Data.DocumentType.Id,
                            );
                            if (index === -1)
                                // first time uploaded this type of documents
                                return [
                                    ...currentUploadedFiles,
                                    {
                                        DocumentType: document!.Id,
                                        Id: responsedDocument.data.Data.Id,
                                    },
                                ];
                            else
                                return currentUploadedFiles.map(
                                    (uploadedFile) =>
                                        uploadedFile.DocumentType ===
                                        document!.Id
                                            ? {
                                                  DocumentType: document!.Id,
                                                  Id: responsedDocument.data
                                                      .Data.Id,
                                              }
                                            : uploadedFile,
                                );
                        });
                    }
                    setFileLoader(false);
                } catch (error) {
                    setFileLoader(false);
                    setFile(null);
                    notify("error", t("upload_file_failed"));
                    console.log(error);
                }
            };
            reader.readAsArrayBuffer(acceptedFile);
        });
    }

    console.log("File Type is : ", file?.type);
    const thumbs: any = file && (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                {file.type.split("/")[0] === "image" ? (
                    <img src={file.preview} style={img} alt="file Preview" />
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
            {fileLoader ? (
                <Loader specific />
            ) : (
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
                        {!file && (
                            <ErrorMessage message={t("field_is_required")} />
                        )}
                    </Stack>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                </Box>
            )}
        </Box>
    );
};
