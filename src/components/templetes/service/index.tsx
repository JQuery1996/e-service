import { FC } from "react";
import {
    Container,
    Grid,
    Link,
    Breadcrumbs,
    Stack,
    Typography,
    Divider,
    Card,
    CardHeader,
    IconButton,
    CardContent,
} from "@mui/material";

import { IForm, IService, ICurrency } from "core/types";
import { useTranslation } from "react-i18next";

import {
    Home as HomeIcon,
    AddShoppingCart as AddShoppingCardIcon,
    ArrowLeft as ArrowLeftIcon,
    LightbulbOutlined as LightbulbOutlinedIcon,
    ApprovalOutlined as ApprovalOutlinedIcon,
    Language as LanguageIcon,
} from "@mui/icons-material";

import { Tabs } from "components/atoms";
import { ServiceForm } from "./service-form";

export interface ServiceTempleteProps {
    service: IService;
    serviceForm: IForm | null;
    currencies: ICurrency[];
}

export const ServiceTemplete: FC<ServiceTempleteProps> = ({
    service,
    serviceForm,
    currencies,
}) => {
    const { t } = useTranslation();
    const breadcrumbs = [
        <Link
            key="key_1"
            underline="hover"
            sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 14,
            }}
            color="primary"
            href="#"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {service.Category.Name_L2}
        </Link>,
        <Link
            key="key_2"
            underline="hover"
            sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 14,
            }}
            color="secondary"
            href="#"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {service.SubCategory.Name_L2}
        </Link>,
    ];
    return (
        <Container maxWidth="xl">
            <Grid
                container
                className="service-details-container"
                sx={{ mt: 16 }}
            >
                <Grid item xs={12}>
                    <Breadcrumbs
                        separator="›"
                        aria-label="breadcrumb"
                        className="breadcrumbs"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                </Grid>
                <Grid item md={9} xs={11} sm={11} sx={{ mt: 2 }}>
                    <Stack spacing={3} direction="column">
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            alignContent="center"
                        >
                            <AddShoppingCardIcon color="primary" />
                            <Divider
                                orientation="vertical"
                                flexItem
                                color="primary"
                            />

                            <Stack direction="column" spacing={1}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    alignContent="center"
                                >
                                    <ArrowLeftIcon />
                                    <Typography variant="h4">
                                        {service.Name_L2}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    alignContent="center"
                                >
                                    <ArrowLeftIcon />
                                    <Typography variant="subtitle2">
                                        {service.Name_L1}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction="column" spacing={4} sx={{ mt: 4 }}>
                        <Tabs
                            listOfTabs={[
                                {
                                    icon: <LightbulbOutlinedIcon />,
                                    label: "تفاصيل الخدمة",
                                    element: (
                                        <Typography>
                                            {service.Description_L2}
                                        </Typography>
                                    ),
                                },
                            ]}
                        />
                    </Stack>
                </Grid>
            </Grid>

            {serviceForm && serviceForm.Fields.length > 0 && (
                <Card elevation={24} sx={{ mt: 4 }}>
                    <CardHeader
                        avatar={
                            <ApprovalOutlinedIcon
                                color="primary"
                                sx={{ fontWeight: "bold" }}
                            />
                        }
                        title={
                            <Typography
                                variant="h5"
                                color="primary"
                                sx={{ fontWeight: "bold" }}
                            >
                                {t("add_request")}
                            </Typography>
                        }
                        titleTypographyProps={{
                            fontWeight: "bold",
                            variant: "body1",
                        }}
                        subheader={service.Name_L2}
                        action={
                            <IconButton sx={{ mt: 1 }}>
                                <LanguageIcon
                                    color="info"
                                    sx={{ cursor: "pointer" }}
                                />
                            </IconButton>
                        }
                        style={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                        {serviceForm && (
                            <ServiceForm
                                serviceForm={serviceForm}
                                currencies={currencies}
                            />
                        )}
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};
