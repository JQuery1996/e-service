import { Button, Chip, Grid, Paper } from "@mui/material";
import { SubCategoryCard } from "components/molecules";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../assets/css/main.css";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import type { ICategory } from "core/types/category";
import { ISubCategory } from "core/types/sub-category";
import { useSideEffect } from "./useSideEffect";

export const SummaryList: FC<ICategory> = ({
    Id,
    Name_L1,
    Name_L2,
    Name_L3,
}) => {
    //Hooks
    const { t } = useTranslation();
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    useSideEffect(Id, setSubCategories);
    return (
        <Grid container spacing={2} sx={{ my: 2, mb: 7 }}>
            <Grid
                container
                item
                justifyContent={"space-between"}
                className="list-summary-title"
            >
                <Chip
                    variant="filled"
                    color="primary"
                    label={Name_L2}
                    size="medium"
                    icon={<MiscellaneousServicesIcon />}
                    sx={{ fontSize: 20 }}
                />
                <Button color="primary" variant="text">
                    {t("show_more")}
                </Button>
            </Grid>
            <Grid
                container
                item
                spacing={4}
                direction="row"
                sx={{ mx: 8, my: 2 }}
            >
                {subCategories.length > 0 &&
                    subCategories.map((subCategory) => (
                        <Grid item md={3} xs={12} sm={6} key={subCategory.Id}>
                            <Paper elevation={24}>
                                <SubCategoryCard
                                    Id={subCategory.Id}
                                    Name_L1={subCategory.Name_L1}
                                    Name_L2={subCategory.Name_L2}
                                    Name_L3={subCategory.Name_L3}
                                />
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
};
