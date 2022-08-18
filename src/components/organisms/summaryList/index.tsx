import { Button, Grid, Typography } from "@mui/material";
import { ServiceCard } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import '../../../assets/css/main.css';

export interface SummaryListProps {
  title?: string;
}

export const SummaryList: FC<SummaryListProps> = ({ title }) => {
  //Hooks
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} sx={{ my: 2, mb:7 }}>
      <Grid container item justifyContent={"space-between"} className="list-summary-title">
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Button color="primary" variant="text">
          {t("show_more")}
        </Button>
      </Grid>
      <Grid container item spacing={1} justifyContent="center" direction="row" alignItems="center" >
        <Grid item md={2.2} xs={12} sm={6}>
          <ServiceCard price={"50$"} />
        </Grid>
        <Grid item md={2.2} xs={12} sm={6}>
          <ServiceCard price={"50$"} />
        </Grid>
        <Grid item md={2.2} xs={12} sm={6}>
          <ServiceCard price={"50$"} />
        </Grid>
        <Grid item md={2.2} xs={12} sm={6}>
          <ServiceCard price={"50$"} />
        </Grid>
        <Grid item md={2.2} xs={12} sm={6}>
          <ServiceCard price={"50$"} />
        </Grid>
      </Grid>
    </Grid>
  );
};
