import { IService } from "core/types";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { ServiceCard } from "../service-card";

interface IServiceCardContainer {
    services: IService[];
}
export function ServiceCardContainer({ services }: IServiceCardContainer) {
    return services && services.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 4 }}>
            {services.map((service) => (
                <Grid item key={service.Id} xs={12} sm={12} md={6} lg={4}>
                    <ServiceCard
                        category={service.Category}
                        subCategory={service.SubCategory}
                        service={service}
                    />
                </Grid>
            ))}
        </Grid>
    ) : (
        <Alert severity="success" variant="outlined" sx={{ mt: 4 }}>
            <AlertTitle>ملاحظه</AlertTitle>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
                لا يوجد خدمات في هذا القسم يرجى إختبار اقسام اخرى.{" "}
            </Typography>
        </Alert>
    );
}
