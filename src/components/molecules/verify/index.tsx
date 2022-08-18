import { Button, Grid, Container, Typography, Link } from "@mui/material";
import { EInput } from "components/atoms";
import { FC, useState, createRef } from "react";
import { useTranslation } from "react-i18next";

export interface VerifyFormProps {}

export const VerifyForm: FC<VerifyFormProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const [pin, setPin] = useState<string[]>(
        Array.from({ length: 5 }, () => ""),
    );

    const pinRefs: any[] = Array.from({ length: 5 }, () => createRef<any>());

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        position: number,
    ) {
        setPin((currentPinArray) =>
            currentPinArray.map((P, index) =>
                index === position ? event.target.value : P,
            ),
        );
        position < 4 &&
            event.target.value &&
            pinRefs[1 + position]?.current.focus();
    }

    function handleVerify() {}
    return (
        <Container>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <div className="pin-div">
                    {[0, 1, 2, 3, 4].map((element) => (
                        <EInput
                            ref={pinRefs[element]}
                            key={element}
                            sx={{ mb: 2 }}
                            className="pin"
                            onChange={(e) => handleChange(e, element)}
                            isPinInput={true}
                        />
                    ))}
                </div>

                <div className="resend-pin-div">
                    <Link
                        href="#"
                        underline="hover"
                        variant="body2"
                        color="#02676b"
                    >
                        <Typography
                            className="resend-pin-link"
                            sx={{ mb: 3, fontWeight: "bold" }}
                        >
                            {t("resend_pin")}
                        </Typography>
                    </Link>
                </div>

                <div className="action-btn-div">
                    <Button className="action-btn" onClick={handleVerify}>
                        {t("reset_password_btn")}
                    </Button>
                </div>
            </Grid>
        </Container>
    );
};
