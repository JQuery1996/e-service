import { Grid } from "@mui/material";
import { IDocumentType } from "core/types";
import { Dispatch, SetStateAction } from "react";
import { FileDropZone } from "components/atoms";
interface IBuildFormDocuments {
    documents: IDocumentType[];
    setUploadedFiles: Dispatch<
        SetStateAction<{ DocumentType: number; Id: number }[]>
    >;
    uploadedFiles: { DocumentType: number; Id: number }[];
}
export function buildFormDocuments({
    documents,
    uploadedFiles,
    setUploadedFiles,
}: IBuildFormDocuments) {
    return (
        <>
            {documents.map((document) => (
                <Grid key={document.Id} item xs={12} sm={12} md={12} lg={6}>
                    <FileDropZone
                        document={document}
                        uploadedFiles={uploadedFiles}
                        setUploadedFiles={setUploadedFiles}
                    />
                </Grid>
            ))}
        </>
    );
}
