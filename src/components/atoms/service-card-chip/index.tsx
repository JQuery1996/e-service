import { ChipProps, Chip } from "@mui/material";
import { Done as DoneIcon } from "@mui/icons-material";
export function ServiceCardChip({
    label,
    color,
    variant = "outlined",
    dir,
    ...props
}: ChipProps) {
    return (
        <Chip
            variant={variant}
            color={color}
            deleteIcon={<DoneIcon />}
            label={label}
            dir={dir}
            sx={{
                fontWeight: "bold",
                borderRadius: 1,
            }}
            size="medium"
            {...props}
        />
    );
}
