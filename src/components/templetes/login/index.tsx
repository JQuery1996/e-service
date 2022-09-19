import { Container, Link, Stack, Typography } from "@mui/material";
import { LoginForm } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "assets/css/login.css";
import "assets/css/auth.css";

export interface LoginTempleteProps {}

export const LoginTemplete: FC<LoginTempleteProps> = () => {
    const { t } = useTranslation();
    return (
        <Container maxWidth={false} style={{ marginRight: 0, paddingRight: 0 }}>
            <div className="content-container">
                <div className="asid-div">
                    <div className="smile-img-container">
                        <img
                            src={require("assets/images/smile.png")}
                            className="smile-img"
                            alt="smile-img"
                        />
                    </div>

                    <div className="bank-img-container">
                        <img
                            src={require("assets/images/bank.png")}
                            className="bank-img"
                            alt="bank-img"
                        />
                    </div>
                </div>{" "}
                {/*asid-div */}
                <div className="main-div">
                    <div className="not-registerd-div">
                        <Link
                            href="/auth/register"
                            underline="hover"
                            variant="body2"
                            color="#02676b"
                            sx={{ fontWeight: "bold" }}
                        >
                            {t("registerd_now")}
                        </Link>
                        <Typography
                            component="h6"
                            sx={{ mr: 2 }}
                            className="not-registerd-txt"
                        >
                            {t("not_registerd")}
                        </Typography>
                    </div>
                    <div className="form-container">
                        <div className="form-content">
                            <Stack direction={"column"}>
                                <Typography variant="h6" sx={{ color: "gray" }}>
                                    {t("welcome_again")}
                                </Typography>
                                <Typography
                                    fontWeight="bold"
                                    sx={{ mb: 6 }}
                                    className="title-text"
                                >
                                    {t("login")}
                                </Typography>
                                <LoginForm />
                            </Stack>
                        </div>
                    </div>{" "}
                    {/*form-container*/}
                </div>
            </div>
        </Container>
    );
};
