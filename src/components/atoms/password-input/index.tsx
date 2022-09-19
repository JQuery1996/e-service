import { Dispatch, SetStateAction, useState } from "react";
import {
    VpnKey as VpnKeyIcon,
    VpnKeyOff as VpnKeyOffIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Validator } from "utils/validation";
import { EInput } from "../input";
import { IconButton, InputAdornment } from "@mui/material";

const passwordValidationConfig = { min: 8 };

export function PasswordInput({
    password,
    setPassword,
}: {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
}) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { t } = useTranslation();

    return (
        <EInput
            label={t("password")}
            placeholder={t("enter_password")}
            type={isVisible ? "text" : "password"}
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
                            setIsVisible((currentState) => !currentState)
                        }
                        edge="end"
                    >
                        {isVisible ? (
                            <VpnKeyOffIcon color="primary" />
                        ) : (
                            <VpnKeyIcon color="primary" />
                        )}
                    </IconButton>
                </InputAdornment>
            }
            required
        />
    );
}
