import { useMemo } from "react";
import { Divider, Tooltip, Typography } from "@mui/material";

import { Stack } from "@mui/system";
import { IDocumentType } from "core/types";
import moment from "moment";

const DOWNLOAD_DOCUMENT_URL = process.env.REACT_APP_DOWNLOAD_FILE!;
interface IFileCard {
    url: string;
    document: IDocumentType;
    creationTimeStamp: Date;
}
export function FileCard({ url, document, creationTimeStamp }: IFileCard) {
    const documentExtension = useMemo(() => {
        const extension = url.split(".").at(-1);
        if (extension === "pdf") return require("assets/images/pdf-80.png");
        return require("assets/images/picture-80.png");
    }, [url]);
    return (
        <Tooltip
            title={
                <Stack direction="column" dir="rtl">
                    <Typography variant="subtitle1">
                        أنشأ {moment(creationTimeStamp).fromNow()}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption">إضغط للتحميل</Typography>
                </Stack>
            }
            arrow
            onClick={() => {
                window.open(`${DOWNLOAD_DOCUMENT_URL}/${url}`, "_newtab");
            }}
        >
            <Stack
                direction="column"
                sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <img
                    src={documentExtension}
                    alt="file-icon"
                    height="80"
                    width="80"
                />

                <Typography variant="subtitle1">{document.Name_L2}</Typography>
            </Stack>
        </Tooltip>
    );
}
