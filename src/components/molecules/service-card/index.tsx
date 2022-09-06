import { useState } from "react";
import {
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    Tooltip,
    Button,
    CardContent,
    Stack,
    Typography,
    IconButton,
    Divider,
} from "@mui/material";

import { FC } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import type { ICategory, ISubCategory, IService } from "core/types";
import {
    Settings as SettingsIcon,
    ArrowBack as ArrowBackIcon,
    Description as DescriptionIcon,
    Language as LanguageIcon,
    Class as ClassIcon,
    SubdirectoryArrowLeft as SubdirectoryArrowLeftIcon,
} from "@mui/icons-material";
import { ServiceCardChip } from "components/atoms";

interface IServiceCard {
    category: ICategory;
    subCategory: ISubCategory;
    service: IService;
}

export const ServiceCard: FC<IServiceCard> = ({
    category,
    subCategory,
    service,
}) => {
    //Hooks
    const navigation = useNavigate();
    const { t } = useTranslation();
    const [descriptionLanguage, setDescriptionLanguage] = useState<
        "Name_L1" | "Name_L2"
    >("Name_L2");

    const handleOpenService = (serviceId: number) => {
        navigation(`/service/${serviceId}`, {
            state: { service },
        });
    };

    const toggleDescriptionLanguage = async () => {
        await setDescriptionLanguage((old) =>
            old === "Name_L1" ? "Name_L2" : "Name_L1",
        );
    };
    return (
        <Card>
            <CardHeader
                avatar={<SettingsIcon />}
                title={service.Name_L2}
                titleTypographyProps={{ fontWeight: "bold", variant: "body1" }}
                subheader={service.Name_L1}
                action={
                    <IconButton
                        sx={{ mt: 1 }}
                        onClick={toggleDescriptionLanguage}
                    >
                        <LanguageIcon color="info" sx={{ cursor: "pointer" }} />
                    </IconButton>
                }
                style={{ fontWeight: "bold" }}
            />

            <CardMedia
                component="img"
                height="250"
                image={require("../../../assets/images/service.PNG")}
                alt="Paella dish"
            />
            <CardContent
                dir={descriptionLanguage === "Name_L1" ? "ltr" : "rtl"}
            >
                <Stack direction="row" spacing={2}>
                    <DescriptionIcon fontSize="medium" color="primary" />
                    <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 16, fontWeight: "bold" }}
                    >
                        {service[descriptionLanguage]}
                    </Typography>
                </Stack>

                <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                    <ServiceCardChip
                        dir={descriptionLanguage === "Name_L1" ? "ltr" : "rtl"}
                        color="success"
                        label={
                            descriptionLanguage === "Name_L1"
                                ? `Category: ${category.Name_L1}`
                                : `الفئة: ${category.Name_L2}`
                        }
                        icon={<ClassIcon />}
                    />
                    <ServiceCardChip
                        dir={descriptionLanguage === "Name_L1" ? "ltr" : "rtl"}
                        color="info"
                        label={
                            descriptionLanguage === "Name_L1"
                                ? `Sub-Category: ${subCategory.Name_L1}`
                                : `الفئه الفرعية: ${subCategory.Name_L2}`
                        }
                        icon={<SubdirectoryArrowLeftIcon />}
                    />
                </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ mt: 1 }}>
                <Tooltip title="دخول إلى التفاصيل">
                    <Button
                        variant="text"
                        endIcon={
                            <ArrowBackIcon
                                sx={{ fontWeight: "bold" }}
                                color="primary"
                            />
                        }
                        onClick={() => handleOpenService(service.Id)}
                        color="info"
                        sx={{ fontWeight: "bold", color: "#000" }}
                    >
                        {t("enter")}
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    );
};
