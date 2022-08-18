import { useState, useMemo } from "react";
import { Validator } from "utils/validation";

export function useRegisterState(passwordValidationConfig: any) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const disableRegister = useMemo(() => {
        return (
            !Validator.nonEmptyStringValidation(fullName) ||
            !Validator.emailValidation(email) ||
            !Validator.passwordValidation(password, passwordValidationConfig)
        );
    }, [email, fullName, password, passwordValidationConfig]);

    return {
        showPassword,
        setShowPassword,
        email,
        setEmail,
        fullName,
        setFullName,
        password,
        setPassword,
        disableRegister,
    };
}
