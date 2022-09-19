import {
    FormControl,
    FormHelperText,
    InputBaseProps,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { FC, useState } from "react";
import { ErrorMessage } from "../error-message";

export interface ETextareaProps extends InputBaseProps {
    label?: string;
    required?: boolean;
    errorMessage?: string;
}

export const ETextarea: FC<ETextareaProps> = ({
    label,
    required,
    error,
    errorMessage,
    sx,
    ...props
}) => {
    //Hooks
    const [dirty, setDirty] = useState<boolean>(false);
    return (
        <FormControl variant="standard" fullWidth required={required}>
            {label && (
                <InputLabel shrink htmlFor="bootstrap-input">
                    {label}
                </InputLabel>
            )}
            <OutlinedInput
                sx={{
                    "label + &": {
                        marginTop: 3,
                    },
                    //   height: 50,
                    ...sx,
                }}
                multiline
                onFocus={() => setDirty(true)}
                onBlur={() => setDirty(false)}
                {...props}
            />

            {dirty && error && (
                <FormHelperText error sx={{ fontWeight: "bold" }}>
                    <ErrorMessage message={errorMessage ?? ""} />
                </FormHelperText>
            )}
        </FormControl>
    );
};
