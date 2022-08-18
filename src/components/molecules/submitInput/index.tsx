import { Button, InputBase, InputBaseProps, Paper, Stack } from "@mui/material";
import { FC } from "react";

export interface SubmitInputProps extends InputBaseProps {}

export const SubmitInput: FC<SubmitInputProps> = ({ ...props }) => {
    //Hooks

    return (
        <Paper
            sx={{
                width: "100%",
                boxShadow: "0px 8px 50px #0D0A2C0F",
                border: "1px solid #EFF0F6",
                borderRadius: "60px",
                backgroundColor: "white",
                p: 1,
            }}
        >
            <Stack direction={"row"} spacing={1}>
                <Button size="large">Subscribe</Button>
                <InputBase sx={{ width: "100%" }} {...props} />
            </Stack>
        </Paper>
    );
};
