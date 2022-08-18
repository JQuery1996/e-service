import { Container, Grid, Stack, Typography, Breadcrumbs, Link } from "@mui/material";
import { BuyServiceForm } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import '../../../assets/css/buy-service.css';

export interface BuyServiceTempleteProps {}

export const BuyServiceTemplete: FC<BuyServiceTempleteProps> = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="#">
      الفئة
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="#"
    >
      الفئة الفرعية
    </Link>,
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumbs">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack direction={"column"}>
            <Typography
              variant="h5"
              component="h5"
              fontWeight="bold"
              className="service-name-buy"
              sx={{ mb: 6 }}
            >
              شراء خدمة توصيل خضراوات من مصر الى دمشق
            </Typography>
            <BuyServiceForm />
          </Stack>
        </Grid>
        <Grid item md={6} xs={12}>
        </Grid>
      </Grid>
    </Container>
  );
};
