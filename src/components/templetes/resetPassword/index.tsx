import { Container, Stack, Typography, Link } from "@mui/material";
import { ResetPasswordForm } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "../../../assets/css/reset-password.css";
import "../../../assets/css/auth.css";

export interface ResetPasswordTempleteProps {}

export const ResetPasswordTemplete: FC<ResetPasswordTempleteProps> = () => {
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
                    <div className="form-container div-margin">
                        <div className="form-content">
                            <Stack direction={"column"}>
                                <Typography
                                    sx={{ mr: 2 }}
                                    className="not-registerd-txt"
                                >
                                    {t("do_you_forget_password_txt")}
                                </Typography>

                                <Typography
                                    fontWeight="bold"
                                    sx={{ mb: 6 }}
                                    className="title-text"
                                >
                                    {t("reset_password")}
                                </Typography>
                                <ResetPasswordForm />
                            </Stack>
                        </div>
                    </div>{" "}
                    {/*form-container*/}
                </div>
                {/*main-div*/}
            </div>
        </Container>
    );
};
