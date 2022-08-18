import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import StarIcon from '@mui/icons-material/Star';

export interface StartRateProps {
    rate: string
}



export const StartRate: FC<StartRateProps> = ({ rate }) => {
    //Hooks

    return (
        <Stack direction={"row"} spacing={1} alignItems="center">
            <Typography>{rate}</Typography>
            <StarIcon sx={{
                width: 15,
                height: 15,
                color: "grey.500"
            }} />
        </Stack>


    );
}