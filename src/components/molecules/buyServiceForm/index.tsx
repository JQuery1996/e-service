import { Button, Grid, Avatar, IconButton, Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { EInput, ETextarea } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export interface BuyServiceFormProps {}

export const BuyServiceForm: FC<BuyServiceFormProps> = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>  
      <Grid item xs={12}>
        <Box className="price-buy-service-container">
          <Box className="price-buy-service">
            <Typography>
              {t("price")} <span className="bule-color service-price">50$</span>
            </Typography>

            <Typography>
              5 أيام 
            </Typography>
          </Box>        
          <Box className="buy-btn-container"><Button className="buy-btn">{t("buy_service")}</Button></Box>
        </Box>        
      </Grid>

      <Grid item xs={12}>
       <Typography className="buy-service-desc">
        يتوجب عليك عند طلب هذه الخدمة رفع او تحديد ملفات محددة من حسابك و أيضا يتطلب املاء بعض البيانات لإتمام هذه الخدمة  
        </Typography>
      </Grid> 

      <Grid item sm={6} xs={12}>
        <EInput label="الاسم الاول" placeholder="ادخل الاسم الاول" />
      </Grid>
      <Grid item sm={6} xs={12}>
        <EInput label="الاسم الاخير" placeholder="ادخل الاسم الاخير" />
      </Grid>
      <Grid item sm={12} xs={12}>
        <EInput label="البريد الإلكتروني" placeholder="البريد الإلكتروني" />
      </Grid>
      <Grid item sm={12} xs={12}>
        <EInput label="رقم الهاتف" placeholder="ادخل رقم الهاتف" />
      </Grid>
      <Grid item xs={12}>
        <ETextarea label="العنوان" placeholder="ادخل العنوان" />
      </Grid>    
    </Grid>
  );
};
