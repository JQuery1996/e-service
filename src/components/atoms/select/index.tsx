import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    SelectProps,
    SelectChangeEvent,
    Box,
    Chip,
} from "@mui/material";

interface IESelect extends SelectProps {
    value: any;
    setValue: (value: any) => void;
    label: string;
    helperText?: string;
    options: { value: any | number; label: string }[];
    color?:
        | "error"
        | "primary"
        | "secondary"
        | "info"
        | "success"
        | "warning"
        | undefined;
}
export function ESelect({
    value,
    setValue,
    label,
    options,
    helperText,
    color,
    ...props
}: IESelect) {
    function handleChange(e: SelectChangeEvent<any>) {
        setValue(e.target.value);
    }
    return (
        <FormControl
            style={{ marginLeft: 2, marginRight: 2 }}
            fullWidth
            color={color ?? "primary"}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                id=""
                value={value.Id ? value : ""}
                label={label}
                onChange={handleChange}
                renderValue={(selected) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                        }}
                    >
                        <Chip
                            color="primary"
                            label={value.Name_L2}
                            style={{ borderRadius: 4 }}
                        />
                    </Box>
                )}
                {...props}
            >
                <MenuItem dir="rtl" value="" disabled>
                    <em>يرجى إختيار عنصر من القائمة</em>
                </MenuItem>

                {options.map(({ label, value }, index) => (
                    <MenuItem key={index} value={value} dir="rtl">
                        {label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && helperText.length > 0 && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
}
