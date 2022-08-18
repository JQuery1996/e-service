import { Container, Stack, Typography, Link } from "@mui/material";
import { SelectCountryForm } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "../../../assets/css/select-country.css";
import "../../../assets/css/auth.css";

export interface SelectCountryTempleteProps {}

export const SelectCountryTemplete: FC<SelectCountryTempleteProps> = () => {
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
                            sx={{ mr: 2 }}
                            className="not-registerd-txt"
                        >
                            {t("have_account")}
                        </Typography>
                    </div>
                    <div className="form-container div-margin">
                        <div className="form-content">
                            <Stack direction={"column"}>
                                <Typography
                                    component="h6"
                                    className="not-registerd-txt"
                                >
                                    {t("welcome")}
                                </Typography>

                                <Typography
                                    fontWeight="bold"
                                    sx={{ mb: 6 }}
                                    className="title-text"
                                >
                                    {t("you_from")}
                                </Typography>
                                <SelectCountryForm />
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
