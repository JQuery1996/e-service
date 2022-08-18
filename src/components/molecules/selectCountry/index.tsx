import { Button, Container, Stack, Link } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export interface SelectCountryFormProps {}

export const SelectCountryForm: FC<SelectCountryFormProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const [country, setCountry] = useState<string>("");

    return (
        <Container>
            <div className="action-btn-div-select-country">
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 2 }}
                    sx={{ mb: 2 }}
                >
                    <Link href="#">
                        <img
                            src={require("../../../assets/images/syria-flag.png")}
                            alt=""
                        />
                    </Link>
                    <Link href="#">
                        <img
                            src={require("../../../assets/images/sudi-flag.png")}
                            alt=""
                        />
                    </Link>

                    <Link href="#">
                        <img
                            src={require("../../../assets/images/egypt-flag.png")}
                            alt=""
                        />
                    </Link>

                    <Link href="#">
                        <img
                            src={require("../../../assets/images/UAE-flag.png")}
                            alt=""
                        />
                    </Link>
                </Stack>

                <Button className="action-btn" size="large">
                    {t("next")}
                </Button>
            </div>
        </Container>
    );
};
