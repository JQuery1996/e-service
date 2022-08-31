import { Container, Grid, Stack, Typography } from "@mui/material";
import { ServiceCard, ServicesFilter } from "components/molecules";
import { FC } from "react";
// import { useTranslation } from "react-i18next";

export interface FilterServicesTempleteProps {}

export const FilterServicesTemplete: FC<FilterServicesTempleteProps> = () => {
    // const { t } = useTranslation();
    return (
        <Container maxWidth="xl">
            <Grid container direction="column">
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {"نتائج البحث عن"}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {"مثال"}
                    </Typography>
                </Stack>

                <Grid item md={2} sm={12}>
                    <ServicesFilter />
                </Grid>

                <Grid
                    container
                    item
                    sx={{ mt: 2 }}
                    spacing={1}
                    justifyContent="center"
                    direction="row"
                    alignItems="center"
                >
                    <Grid item md={2.2} xs={12} sm={6}>
                        {/* <ServiceCard price={"50$"} /> */}
                    </Grid>
                    <Grid item md={2.2} xs={12} sm={6}>
                        {/* <ServiceCard price={"50$"} /> */}
                    </Grid>
                    <Grid item md={2.2} xs={12} sm={6}>
                        {/* <ServiceCard price={"50$"} /> */}
                    </Grid>
                    <Grid item md={2.2} xs={12} sm={6}>
                        {/* <ServiceCard price={"50$"} /> */}
                    </Grid>
                    <Grid item md={2.2} xs={12} sm={6}>
                        {/* <ServiceCard price={"50$"} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
