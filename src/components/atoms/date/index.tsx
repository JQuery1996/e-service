import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

import {
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ErrorMessage } from "../error-message";

interface IEDate {
    label: string;
    date: string;
    setDate: (value: any, keyboardInputValue?: string | undefined) => void;
    required: boolean;
    error?: boolean;
    errorMessage?: string;
}
export function EDate({
    label,
    date,
    setDate,
    error,
    errorMessage,
    required,
}: IEDate) {
    const [dirty, setDirty] = useState<boolean>(false);

    const [currentDate, setCurrentDate] = useState<Dayjs | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl required={required} fullWidth>
                <FormLabel
                    sx={{
                        color: "primary.main",
                        fontSize: "11px",
                        p: 0,
                        mb: 1,
                    }}
                >
                    {label}
                </FormLabel>
                <DateTimePicker
                    value={currentDate}
                    onChange={(newDate) => {
                        if (!dayjs(newDate).isValid()) return;
                        setCurrentDate(newDate);
                        setDate(newDate);
                    }}
                    disablePast
                    disableMaskedInput
                    // openTo="year"
                    // views={["year", "month", "day", "hours", "minutes"]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            autoComplete="false"
                            autoCorrect="false"
                            fullWidth
                            error={dirty && error}
                            onFocus={() => setDirty(true)}
                            onBlur={() => setDirty(false)}
                        />
                    )}
                />

                {dirty && (error || !dayjs(date).isValid()) && (
                    <FormHelperText error sx={{ fontWeight: "bold" }}>
                        <ErrorMessage message={errorMessage ?? ""} />
                    </FormHelperText>
                )}
            </FormControl>
        </LocalizationProvider>
    );
}
