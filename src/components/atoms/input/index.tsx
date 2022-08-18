import {
    FormControl,
    InputBaseProps,
    InputLabel,
    OutlinedInput,
    FormHelperText,
} from "@mui/material";
import React from "react";

export interface EInputProps extends InputBaseProps {
    label?: string;
    errorMessage?: string;
    isPinInput?: boolean;
}

const EInput = React.forwardRef<any, EInputProps>(
    ({ label, sx, error, errorMessage, isPinInput, ...props }, ref) => {
        //Hooks

        return (
            <FormControl variant="standard" fullWidth sx={{ ...sx }}>
                {label && (
                    <InputLabel shrink htmlFor="bootstrap-input">
                        {label}
                    </InputLabel>
                )}
                <OutlinedInput
                    inputRef={ref}
                    sx={{
                        "label + &": {
                            marginTop: 3,
                        },
                        height: 50,
                        ...(isPinInput && { borderRadius: 3 }),
                    }}
                    {...(isPinInput && { inputProps: { maxLength: 1 } })}
                    {...props}
                />
                {error && (
                    <FormHelperText error sx={{ fontWeight: "bold" }}>
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
        );
    },
);

export { EInput };
