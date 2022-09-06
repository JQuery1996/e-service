import { Grid } from "@mui/material";
import { IDocumentType, IRequest } from "core/types";
import { Dispatch, SetStateAction } from "react";
import { FileDropZone } from "components/atoms";
interface IBuildFormDocuments {
    documents: IDocumentType[];
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
}
export function buildFormDocuments({
    documents,
    serviceRequest,
    setServiceRequest,
}: IBuildFormDocuments) {
    return (
        <>
            {documents.map((document) => (
                <Grid key={document.Id} item xs={12} sm={12} md={12} lg={6}>
                    <FileDropZone
                        document={document}
                        serviceRequest={serviceRequest}
                        setServiceRequest={setServiceRequest}
                    />
                </Grid>
            ))}
        </>
    );
}
