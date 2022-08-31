import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    Grid,
    Container,
    Typography,
    InputAdornment,
    IconButton,
    Stack,
    Box,
    Link,
} from "@mui/material";
import { EInput } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRegisterState } from "./useRegisterState";
import { Validator } from "utils/validation";
import { useAuth } from "utils/hooks/useAuth";

export interface RegisterFormProps {}

const passwordValidationConfig = { min: 8 };
export const RegisterForm: FC<RegisterFormProps> = ({ ...props }) => {
    const { t } = useTranslation();

    const {
        showPassword,
        setShowPassword,
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
        <Container>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <EInput
                    label={t("email")}
                    placeholder={t("enter_email")}
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!Validator.emailValidation(email)}
                    errorMessage={t("invalid_email")}
                />
                <EInput
                    label={t("full_name")}
                    placeholder={t("enter_full_name")}
                    sx={{ mb: 2 }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={!Validator.nonEmptyStringValidation(fullName)}
                    errorMessage={t("field_is_required")}
                />
                <EInput
                    label={t("password")}
                    placeholder={t("enter_password")}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={
                        !Validator.passwordValidation(
                            password,
                            passwordValidationConfig,
                        )
                    }
                    errorMessage={t("invalid_password")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                    setShowPassword(
                                        (currentState) => !currentState,
                                    )
                                }
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <div className="action-btn-div">
                    <Button
                        className="action-btn"
                        sx={{ mt: 4 }}
                        onClick={() => register(fullName, email, password)}
                        disabled={disableRegister}
                    >
                        {t("register_btn")}
                    </Button>
                </div>

                <div className="or-div">
                    <div>
                        <Typography sx={{ mt: 3 }} className="or-txt">
                            {t("or")}
                        </Typography>
                    </div>
                </div>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Link href="#">
                        <Box
                            sx={{
                                p: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                minWidth: 58,
                                minHeight: 48,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="40"
                                height="40"
                                viewBox="0 0 48 48"
                                style={{ fill: "#000" }}
                            >
                                <path
                                    fill="#fbc02d"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                                <path
                                    fill="#e53935"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                ></path>
                                <path
                                    fill="#4caf50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                ></path>
                                <path
                                    fill="#1565c0"
                                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                            </svg>
                        </Box>
                    </Link>

                    <Link href="#">
                        <Box
                            sx={{
                                p: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                minWidth: 58,
                                minHeight: 48,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                style={{ fill: "#000" }}
                            >
                                <path
                                    d="M16.988,4.508c-1.918,0-2.72,1.178-4.049,1.178c-1.367,0-2.616-1.105-4.27-1.105	C6.419,4.582,3,6.667,3,11.576C3,16.043,7.047,21,9.331,21c1.388,0.014,1.725-0.874,3.608-0.883	c1.885-0.014,2.291,0.895,3.681,0.883c1.565-0.012,2.788-1.73,3.681-3.092c0.15-0.229,0.279-0.431,0.396-0.621	c0.549-0.897,0.332-2.038-0.48-2.707c-1.928-1.589-2.207-4.938-0.056-6.596c0.77-0.594,0.734-1.792-0.075-2.331	C19.069,4.973,17.853,4.508,16.988,4.508z"
                                    opacity=".35"
                                ></path>
                                <path d="M16.612,0.811c0.074-0.481-0.345-0.912-0.816-0.79c-0.927,0.24-1.86,0.77-2.471,1.405c-0.531,0.555-0.978,1.31-1.079,2.102	c-0.057,0.45,0.325,0.852,0.771,0.773c0.997-0.177,1.933-0.736,2.541-1.409C16.071,2.326,16.492,1.597,16.612,0.811z"></path>
                            </svg>
                        </Box>
                    </Link>
                </Stack>
            </Grid>
        </Container>
    );
};
