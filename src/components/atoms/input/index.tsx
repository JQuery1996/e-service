import React, { useState } from "react";
import {
    FormControl,
    InputBaseProps,
    InputLabel,
    OutlinedInput,
    FormHelperText,
} from "@mui/material";
import { ErrorMessage } from "../error-message";

export interface EInputProps extends InputBaseProps {
    label?: string;
    errorMessage?: string;
    isPinInput?: boolean;
    required?: boolean;
}

const EInput = React.forwardRef<any, EInputProps>(
    (
        { label, sx, error, errorMessage, isPinInput, required, ...props },
        ref,
    ) => {
        //Hooks
        const [dirty, setDirty] = useState<boolean>(false);

        return (
            <FormControl
                variant="standard"
                fullWidth
                sx={{ ...sx }}
                required={required}
            >
                {label && (
                    <InputLabel shrink htmlFor="bootstrap-input">
                        {label}
                    </InputLabel>
                )}
                <OutlinedInput
                    id="select-input"
                    onFocus={() => setDirty(true)}
                    onBlur={() => setDirty(false)}
                    inputRef={ref}
                    sx={{
                        "label + &": {
                            marginTop: 3,
                        },
                        // height: 50,
                        ...(isPinInput && { borderRadius: 3 }),
                    }}
                    {...(isPinInput && { inputProps: { maxLength: 1 } })}
                    {...props}
                />
                {dirty && error && (
                    <FormHelperText error sx={{ fontWeight: "bold" }}>
                        <ErrorMessage message={errorMessage ?? ""} />
                    </FormHelperText>
                )}
            </FormControl>
        );
    },
);

export { EInput };
