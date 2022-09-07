import { Container, Grid, Typography, Stack } from "@mui/material";
import { ServiceCard } from "components/molecules";
import { FC } from "react";
// import { useTranslation } from "react-i18next";
import { SettingsSuggest as SettingSuggestIcon } from "@mui/icons-material";
export interface ReqestedServicesTempleteProps {}

export const ReqestedServicesTemplete: FC<
    ReqestedServicesTempleteProps
> = () => {
    // const { t } = useTranslation();
    return (
        <Container maxWidth="xl" sx={{ mt: 14 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: "flex-start", gap: 1 }}
            >
                <SettingSuggestIcon sx={{ fontSize: 30 }} color="primary" />
                <Typography variant="h6" fontWeight="bold">
                    {"الخدمات المطلوبة"}
                </Typography>
            </Stack>

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
