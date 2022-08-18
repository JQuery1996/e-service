import { FC } from "react";
import { Stack, Typography } from "@mui/material";

export interface InformationListProps {
  title?: string;
  informations: string[];
}

export const InformationList: FC<InformationListProps> = ({
  informations,
  title,
}) => {
  //Hooks

  return (
    <Stack spacing={1}>
      <Typography variant="h6" color="primary">
        {title}
      </Typography>
      {informations.map((info: string, index: number) => (
        <Stack direction="row" spacing={1} key={index}>
          <Typography color="primary">{`${index + 1}-`}</Typography>
          <Typography>{info}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
