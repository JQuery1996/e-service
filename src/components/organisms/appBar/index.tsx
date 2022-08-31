import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { ProfileAvatar, SerchInput } from "components/molecules";
import { CountrySelect } from "components/atoms";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export const ResponsiveAppBar = () => {
    const navigate = useNavigate();
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        variant="text"
                        sx={{
                            mr: 1,
                            display: { md: "flex" },
                            flexGrow: 0,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate(
                                process.env.REACT_APP_FRONT_END_HOME_PAGE!,
                            );
                        }}
                    >
                        <img
                            src={require("../../../assets/images/logo.png")}
                            alt="logo"
                        ></img>
                    </Button>
                    <Box sx={{ flexGrow: 1, mx: 1 }}>
                        <SerchInput />
                    </Box>
                    <Box sx={{ flexGrow: 0, mx: 1 }}>
                        <CountrySelect />
                    </Box>
                    <Box sx={{ flexGrow: 0, ml: 1 }}>
                        <ProfileAvatar />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
