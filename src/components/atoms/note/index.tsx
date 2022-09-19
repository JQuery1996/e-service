import { Avatar, Typography, Stack, Box } from "@mui/material";
import { deepOrange, blue } from "@mui/material/colors";
import { INote } from "core/types";
import moment from "moment";
interface NoteProps extends INote {
    email: string;
}
export function Note({
    Note,
    AdminName,
    IsAdminNote,
    CreationDate,
    email,
}: NoteProps) {
    const nameFromEmail = email.split("@")[0];

    return (
        <Stack direction="column" spacing={0.2} sx={{ my: 3 }}>
            <Stack direction="row" spacing={2}>
                <Avatar
                    sx={{
                        bgcolor: IsAdminNote ? deepOrange[500] : blue[500],
                        color: "white",
                        height: 30,
                        width: 30,
                        mt: 0.5,
                    }}
                >
                    {IsAdminNote ? AdminName[0] : nameFromEmail[0]}
                </Avatar>
                <Stack direction="column" spacing={0}>
                    <Typography
                        variant="body1"
                        color={IsAdminNote ? "success" : "primary"}
                        sx={{ fontWeight: "bold" }}
                    >
                        {IsAdminNote ? AdminName : email}
                    </Typography>
                    <Typography variant="caption">
                        {moment(CreationDate).fromNow()}
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Typography variant="subtitle2" sx={{ mx: 5 }}>
                    {Note}
                </Typography>
            </Box>
        </Stack>
    );
}
