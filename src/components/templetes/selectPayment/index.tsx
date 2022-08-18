import { Stack, Typography, Grid, Box } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Service } from "core/types";

import '../../../assets/css/select-payment.css';
import '../../../assets/css/auth.css';

export interface SelectPaymentTempleteProps {
  service: Service;
}

export const SelectPaymentTemplete: FC<SelectPaymentTempleteProps> = (props) => {
  const { service } = props;
  const { name, category, price, currency, details } = service;
  const { t } = useTranslation();
  return (
    <Grid container className="payment-method-container">
      <Grid item xs={9} >
      <Stack  
        direction="column"
        justifyContent="space-between"
        alignItems="right"
        >
          <Typography className="service-name-conteiner">
            {name}
          </Typography>

          <Box className="payment-method-conteiner">
            <a href="#" className="no-dicoration">
            <Box className="paypal-method">
              <div className="paypal-img-div" >
                <img src={require("../../../assets/images/paypal.png")} className="paypal-img"></img>
              </div>                
              <Typography>
                {t("paypal")}
              </Typography>
            </Box>
            </a>
            <a href="#" className="no-dicoration">
            <Box className="visa-method">
              <div className="visa-img-div" >
                <img src={require("../../../assets/images/visa.png")} className="visa-img"></img>
              </div>                
              <Typography>
                {t("visa")}
              </Typography>              
            </Box>
            </a>
          </Box>
      </Stack>
      </Grid>
    </Grid>
  );
};
