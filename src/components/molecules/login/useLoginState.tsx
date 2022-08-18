import { useState, useMemo } from "react";
import { Validator } from "utils/validation";
export function useLoginState(passwordValidationConfig: any) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const disableLogin = useMemo(() => {
        return (
            !Validator.emailValidation(email) ||
            !Validator.passwordValidation(password, passwordValidationConfig)
        );
    }, [email, password, passwordValidationConfig]);

    return {
        showPassword,
        setShowPassword,
        email,
        setEmail,
        password,
        setPassword,
        disableLogin,
    };
}
