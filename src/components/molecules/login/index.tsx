import { Button, Grid, Typography, Link, Box, Stack } from "@mui/material";

import { EInput, PasswordInput, SocialIcons } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Validator } from "utils/validation";
import { useLoginState } from "./useLoginState";
import { useAuth } from "utils/hooks/useAuth";
import { Login as LoginIcon } from "@mui/icons-material";
import { useLoader } from "utils/hooks/useLoader";
import { Loader } from "features/loader/Loader";

export interface LoginFormProps {}

const passwordValidationConfig = { min: 8 };

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const { email, setEmail, password, setPassword, disableLogin } =
        useLoginState(passwordValidationConfig);

    const { isLoading } = useLoader();

    const { login } = useAuth();

    return (
        <>
            {isLoading && <Loader />}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <EInput
                        type="email"
                        label={t("email")}
                        placeholder={t("enter_email")}
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!Validator.emailValidation(email)}
                        errorMessage={t("invalid_email")}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />

                    <div className="forget-password-div">
                        <Link href="#" color="#02676b">
                            <Typography
                                variant="caption"
                                className="forget-password-link"
                                sx={{ mb: 3, mt: 2, fontWeight: "bold" }}
                            >
                                {t("forget_password")}
                            </Typography>
                        </Link>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className="action-btn-div">
                        <Button
                            className="action-btn"
                            onClick={() => login(email, password)}
                            disabled={disableLogin}
                            size="large"
                            startIcon={<LoginIcon />}
                        >
                            {t("login_btn")}
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className="or-div">
                        <div>
                            <Typography
                                sx={{ color: "primary" }}
                                className="or-txt"
                            >
                                {t("or")}
                            </Typography>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <SocialIcons />
                </Grid>
            </Grid>
        </>
    );
};
