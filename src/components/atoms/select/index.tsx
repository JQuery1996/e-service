import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    FormHelperText,
    TextFieldProps,
    TextField,
    MenuItem,
} from "@mui/material";
import { ErrorMessage } from "../error-message";

type IESelect = TextFieldProps & {
    label: string;
    errorMessage?: string;
    options: { value: any | number; label: string }[];
    required?: boolean;
};
export const ESelect = React.forwardRef<any, IESelect>(
    (
        { label, error, errorMessage, options, required, value, ...props },
        ref,
    ) => {
        const [dirty, setDirty] = useState<boolean>(false);

        let initialValue: any = value;
        if (
            value === null ||
            value === undefined ||
            (typeof value === "object" &&
                !Array.isArray(value) &&
                Object.keys(value).length === 0)
        )
            initialValue = "";

        return (
            <FormControl
                variant="standard"
                fullWidth
                required={Boolean(required)}
            >
                {label && (
                    <InputLabel shrink htmlFor="select-input">
                        {label}
                    </InputLabel>
                )}
                <TextField
                    id="select-input"
                    onFocus={() => setDirty(true)}
                    onBlur={() => setDirty(false)}
                    select
                    inputRef={ref}
                    sx={{
                        "label + &": {
                            marginTop: 3,
                        },
                        height: 50,
                    }}
                    value={initialValue}
                    {...props}
                >
                    <MenuItem value="" dir="rtl">
                        <em>يرجى إختيار عنصر من القائمة</em>
                    </MenuItem>
                    {options.map((option, index) => (
                        <MenuItem dir="rtl" key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {dirty && error && (
                    <FormHelperText error sx={{ fontWeight: "bold", mt: 1 }}>
                        <ErrorMessage message={errorMessage ?? ""} />
                    </FormHelperText>
                )}
            </FormControl>
        );
    },
);
