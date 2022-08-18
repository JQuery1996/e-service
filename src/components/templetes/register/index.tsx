import { Container, Link, Stack, Typography } from "@mui/material";
import { RegisterForm } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "../../../assets/css/login.css";
import "../../../assets/css/auth.css";

export interface RegisterTempleteProps {}

export const RegisterTemplete: FC<RegisterTempleteProps> = () => {
    const { t } = useTranslation();
    return (
        <Container maxWidth={false} style={{ marginRight: 0, paddingRight: 0 }}>
            <div className="content-container">
                <div className="asid-div">
                    <div className="smile-img-container">
                        <img
                            src={require("../../../assets/images/smile.png")}
                            className="smile-img"
                            alt="smile_img"
                        ></img>
                    </div>

                    <div className="bank-img-container">
                        <img
                            src={require("../../../assets/images/bank.png")}
                            className="bank-img"
                            alt="bank_img"
                        ></img>
                    </div>
                </div>{" "}
                {/*asid-div */}
                <div className="main-div">
                    <div className="not-registerd-div">
                        <Link
                            href="/auth/login"
                            underline="hover"
                            variant="body2"
                            color="#02676b"
                            sx={{ fontWeight: "bold" }}
                        >
                            {t("login_now")}
                        </Link>

                        <Typography
                            component="h6"
                            sx={{ mr: 2 }}
                            className="not-registerd-txt"
                        >
                            {t("have_account")}
                        </Typography>
                    </div>
                    <div className="form-container">
                        <div
                            className=""
                            style={{ width: "50%", margin: "5% auto 0" }}
                        >
                            <Stack direction={"column"}>
                                <Typography variant="h6" sx={{ color: "gray" }}>
                                    {t("welcome")}
                                </Typography>

                                <Typography
                                    fontWeight="bold"
                                    sx={{ mb: 6 }}
                                    className="title-text"
                                >
                                    {t("register")}
                                </Typography>
                                <RegisterForm />
                            </Stack>
                        </div>
                    </div>{" "}
                    {/*form-container*/}
                </div>
            </div>
        </Container>
    );
};
