// material ui imports
import { Box } from "@mui/material";

export function Loader() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <img src={require("assets/images/loader.gif")} alt="loading" />
        </Box>
    );
}
