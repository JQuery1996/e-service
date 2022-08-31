import { Container, Grid, Typography } from "@mui/material";
import { ServiceCard } from "components/molecules";
import { FC } from "react";
// import { useTranslation } from "react-i18next";

export interface ReqestedServicesTempleteProps {}

export const ReqestedServicesTemplete: FC<
    ReqestedServicesTempleteProps
> = () => {
    // const { t } = useTranslation();
    return (
        <Container maxWidth="xl">
            <Typography variant="h6" fontWeight="bold">
                {"الخدمات المطلوبة"}
            </Typography>

            <Grid container item spacing={3} sx={{ mt: 1 }}>
                <Grid item md={4} sm={6} xs={12}>
                    {/* <ServiceCard time={"20/5/2022"} /> */}
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    {/* <ServiceCard time={"20/5/2022"} /> */}
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    {/* <ServiceCard time={"20/5/2022"} /> */}
                </Grid>
            </Grid>
        </Container>
    );
};
