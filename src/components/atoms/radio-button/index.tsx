import { useState } from "react";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    RadioGroupProps,
} from "@mui/material";
import { ErrorMessage } from "../error-message";

interface ERadioButton extends RadioGroupProps {
    error: boolean;
    errorMessage: string;
    row?: boolean;
    required?: boolean;
}
export function ERadio({
    title = "",
    error = false,
    errorMessage,
    row = false,
    children,
    required,
    ...props
}: ERadioButton) {
    const [dirty, setDirty] = useState<boolean>(false);
    return (
        <FormControl
            required={Boolean(required)}
            onMouseEnter={() => setDirty(true)}
            onMouseLeave={() => setDirty(false)}
        >
            <FormLabel
                id={`controlled-radio-button-group-${title ?? ""}`}
                color="primary"
                sx={{ color: "primary.main", fontWeight: "bold" }}
                error={error}
            >
                {title}
            </FormLabel>
            <RadioGroup
                row={row}
                aria-labelledby={`controlled-radio-button-group-${title ?? ""}`}
                name={`controlled-radio-button-group-${title ?? ""}`}
                {...props}
            >
                {children}
            </RadioGroup>
            {dirty && error && <ErrorMessage message={errorMessage} />}
        </FormControl>
    );
}
