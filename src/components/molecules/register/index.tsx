import { Button, Grid, Typography } from "@mui/material";
import { EInput, PasswordInput, SocialIcons } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRegisterState } from "./useRegisterState";
import { Validator } from "utils/validation";
import { useAuth } from "utils/hooks/useAuth";
import { AppRegistration as AppRegistrationIcon } from "@mui/icons-material";
import { useLoader } from "utils/hooks/useLoader";
import { Loader } from "features/loader/Loader";
export interface RegisterFormProps {}

const passwordValidationConfig = { min: 8 };
export const RegisterForm: FC<RegisterFormProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const { isLoading } = useLoader();
    const {
        email,
        setEmail,
        fullName,
        setFullName,
        password,
        setPassword,
        disableRegister,
    } = useRegisterState(passwordValidationConfig);

    const { register } = useAuth();

    return (
        <>
            {isLoading && <Loader />}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <EInput
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
                    <EInput
                        label={t("full_name")}
                        placeholder={t("enter_full_name")}
                        sx={{ mb: 2 }}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={!Validator.nonEmptyStringValidation(fullName)}
                        errorMessage={t("field_is_required")}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />
                </Grid>

                <Grid item xs={12}>
                    <div className="action-btn-div">
                        <Button
                            className="action-btn"
                            sx={{ mt: 4 }}
                            onClick={() => register(fullName, email, password)}
                            disabled={disableRegister}
                            size="large"
                            startIcon={<AppRegistrationIcon />}
                        >
                            {t("register_btn")}
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="or-div">
                        <div>
                            <Typography sx={{ mt: 3 }} className="or-txt">
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
