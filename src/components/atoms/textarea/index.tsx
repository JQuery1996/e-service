import {
  FormControl,
  InputBaseProps,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FC } from "react";

export interface ETextareaProps extends InputBaseProps {
  label?: string;
}

export const ETextarea: FC<ETextareaProps> = ({ label, sx, ...props }) => {
  //Hooks

  return (
    <FormControl variant="standard" fullWidth>
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
        minRows={4}
        {...props}
      />
    </FormControl>
  );
};
