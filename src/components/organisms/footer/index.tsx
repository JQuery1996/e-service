import { Container, Grid, Link, Toolbar, Typography } from "@mui/material";
import { SubmitInput } from "components/molecules";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import "assets/css/main.css";

export interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
    //Hooks
    const { t } = useTranslation();

    return (
        <Toolbar className="footer-container">
            <Container maxWidth="xl" sx={{ marginTop: 2 }}>
                <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                        sm={6}
                        sx={{ mb: { xs: 2, sm: 2 } }}
                    >
                        {/* <Button>Subscribe</Button> */}
                        <SubmitInput
                            fullWidth
                            className="subscribe-container-footer"
                            placeholder="أدخل البريد الإلكتروني"
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                        className="logo-img-container-footer"
                    >
                        <Typography variant="h6" noWrap component="div">
                            <img
                                src={require("../../../assets/images/logo.png")}
                                className="logo-img-footer"
                                alt="logo-footer"
                            ></img>
                        </Typography>
                        <Typography style={{ color: "#02676b" }}>
                            Copyright &copy; {new Date().getFullYear()} Digital
                            Horizons | All Rights <br />
                            Reserved
                        </Typography>
                    </Grid>
                    <Grid item sm={12} xs={12} className="about-container">
                        <Link href="#" underline="hover">
                            <Typography> {t("privecy")} </Typography>
                        </Link>
                        <Link href="#" underline="hover">
                            <Typography sx={{ mr: 2, ml: 2 }}>
                                {" "}
                                {t("rules")}{" "}
                            </Typography>
                        </Link>
                        <Link href="#" underline="hover">
                            <Typography> {t("about")} </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Toolbar>
    );
};
