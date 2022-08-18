import { Stack, Typography, Grid, Box } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import '../../../assets/css/payment-result.css';

export interface PaymentResultTempleteProps {}

export const PaymentResultTemplete: FC<PaymentResultTempleteProps> = () => {
  const { t } = useTranslation();
  return (
    <Grid container className="payment-method-container">
      <Grid item xs={9} >
      <Stack  
        direction="column"
        justifyContent="space-between"
        alignItems="right"
        >
          <Typography fontWeight="bold" className="result">
          تمت عملية الشراء بنجاح 
          </Typography>

         
      </Stack>
      </Grid>
    </Grid>
  );
};
