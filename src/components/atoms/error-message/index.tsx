import { NewReleases as NewReleasesIcon } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { StackProps, typographyVariant } from "@mui/system";

interface IErrorMessage extends StackProps {
    fontSize?: number;
    color?:
        | "inherit"
        | "error"
        | "disabled"
        | "action"
        | "primary"
        | "secondary"
        | "info"
        | "success"
        | "warning"
        | undefined;
    message: string;
    typographyVariant?:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | "caption"
        | "button"
        | "overline"
        | "inherit"
        | undefined;
}
export function ErrorMessage({
    fontSize,
    color,
    message,
    typographyVariant,
    ...props
}: IErrorMessage) {
    return (
        <Stack direction="row" spacing={1}>
            <NewReleasesIcon
                color={color ?? "error"}
                sx={{ fontSize: fontSize ?? 20 }}
            />
            <Typography
                variant={typographyVariant ?? "caption"}
                color={color ?? "error"}
                sx={{ fontWeight: "bold" }}
            >
                {message}
            </Typography>
        </Stack>
    );
}
