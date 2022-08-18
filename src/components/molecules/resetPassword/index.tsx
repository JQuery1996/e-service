import { Button, Grid, Container, Typography } from "@mui/material";
import { EInput } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export interface ResetPasswordFormProps {}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>("");

    function handleResetPassword() {
        console.log({ email });
    }
    return (
        <Container>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <EInput
                    label={t("email")}
                    placeholder={t("enter_email")}
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="action-btn-div">
                    <Button
                        className="action-btn"
                        onClick={handleResetPassword}
                    >
                        {t("reset_password_btn")}
                    </Button>
                </div>
            </Grid>
        </Container>
    );
};
