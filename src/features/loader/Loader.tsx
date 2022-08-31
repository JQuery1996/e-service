// material ui imports
import { Container } from "@mui/material";

export function Loader() {
    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                position: "absolute",
                top: 0,
                left: 0,
                minWidth: "100%",
                height: "100vh",
                backgroundColor: "transparent",
            }}
        >
            <img
                src={require("../../assets/images/loader.gif")}
                alt="loading"
            />
        </Container>
    );
}
