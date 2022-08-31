import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Tooltip,
    Button,
} from "@mui/material";

import type { ISubCategory } from "core/types/sub-category";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const SubCategoryCard: FC<ISubCategory> = ({
    Id,
    Name_L1,
    Name_L2,
    Name_L3,
}) => {
    //Hooks
    const navigation = useNavigate();
    const { t } = useTranslation();

    const handleClick = (Id: number) => {
        navigation(`/service/${Id}`);
    };
    return (
        <Card>
            <CardHeader
                avatar={<SettingsIcon />}
                title={Name_L2}
                titleTypographyProps={{ fontWeight: "bold", variant: "body1" }}
                subheader={Name_L1}
                style={{ fontWeight: "bold" }}
            />
            <CardMedia
                component="img"
                height="250"
                image={require("../../../assets/images/service.PNG")}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <Tooltip title="دخول إلى التفاصيل">
                    <Button
                        variant="text"
                        endIcon={
                            <ArrowBackIcon
                                sx={{ fontWeight: "bold" }}
                                color="primary"
                            />
                        }
                        onClick={() => handleClick(Id)}
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
