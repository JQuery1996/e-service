import { FC } from "react";
import { Stack, Typography } from "@mui/material";

export interface DetailsProps {
  title?: string;
  details: string;
}

export const Details: FC<DetailsProps> = ({ details, title }) => {
  //Hooks

  return (
    <Stack spacing={1}>
      <Typography variant="h6" color="primary">
        {title}
      </Typography>
      <Typography className="service-details-desc" variant="body2" color="gray">
        {details}
      </Typography>
    </Stack>
  );
};
