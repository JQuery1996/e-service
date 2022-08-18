import { FC } from "react";
import {
    Container,
    Stack,
    Typography,
    Grid,
    Button,
    Link,
    Breadcrumbs,
} from "@mui/material";
import { Box } from "@mui/system";
import { Service } from "core/types";
import { RequestService } from "components/molecules/requestService";
import { Details, InformationList } from "components/molecules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import "../../../assets/css/service-details.css";
import { Home as HomeIcon } from "@mui/icons-material";

export interface ServiceTempleteProps {
    service: Service;
}

export const ServiceTemplete: FC<ServiceTempleteProps> = (props) => {
    const { service } = props;
    const { name, category, price, currency, details } = service;
    const { t } = useTranslation();
    const breadcrumbs = [
        <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            الفئة الرئيسية
        </Link>,
        <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            الفئة الفرعية
        </Link>,
    ];

    return (
        <Grid container className="service-details-container">
            <Grid item xs={12}>
                <Breadcrumbs
                    separator="›"
                    aria-label="breadcrumb"
                    className="breadcrumbs"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Grid>

            <Grid item md={9} xs={11} sm={11}>
                <Stack spacing={3}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography className="service-name-details">
                                {name}
                            </Typography>
                        </Box>
                        {/* <RequestService price={price} currency={currency} /> */}
                    </Stack>

                    <LazyLoadImage
                        height="400"
                        src="https://picsum.photos/300"
                        alt="green iguana"
                        effect="opacity"
                        style={{
                            display: "block",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <div className="service-price-details">
                        <Typography>
                            {t("price")}{" "}
                            <span className="bule-color service-price">
                                {price} {currency}
                            </span>
                        </Typography>

                        <Typography>5 أيام</Typography>
                    </div>
                    <Button className="buy-service-btn">
                        {t("buy_service")}
                    </Button>
                    <Details details={details} title="تفاصيل الخدمة" />
                </Stack>
            </Grid>
        </Grid>
    );
};
