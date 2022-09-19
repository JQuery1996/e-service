import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Chip, Container, Grid, Paper } from "@mui/material";
import { ESelect } from "components/atoms";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { ICategory, ISubCategory } from "core/types";
import { fetchCategories, fetchSubCategories } from "utils/apis";
import { useAppDispatch } from "app/hooks";
import { useLoader } from "utils/hooks/useLoader";

interface IFilterBar {
    setCurrentCategory: Dispatch<SetStateAction<ICategory>>;
    setCurrentSubCategory: Dispatch<SetStateAction<ISubCategory>>;
}
export function FilterBar({
    setCurrentCategory,
    setCurrentSubCategory,
}: IFilterBar) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setLoadingState } = useLoader();
    const [buttonVariant, setButtonVariant] = useState<
        "contained" | "outlined"
    >("outlined");

    // ---------------------  State --------------------- //

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(
        {} as ICategory,
    );

    const [selectedSubCategory, setSelectedSubCategory] =
        useState<ISubCategory>({} as ISubCategory);

    // ------------------------  State ------------------------ //

    // -------------------------  Effect ------------------------- //
    useEffect(() => {
        async function loadCategories() {
            try {
                dispatch(setLoadingState(true));
                const responsedCategories = await fetchCategories();
                setCategories(responsedCategories);
                dispatch(setLoadingState(false));
            } catch (error) {
                console.log(error);
                setCategories([]);
                dispatch(setLoadingState(false));
            }
        }
        loadCategories();
    }, [dispatch, setLoadingState]);
    // ----------------------  Effect ---------------------- //

    // useSideEffect(setCategories);

    async function handleSelectCategory(userSelectedCategory: ICategory) {
        setSelectedSubCategory({} as ISubCategory);
        setSelectedCategory(userSelectedCategory);
        const responsedSubCategories = await fetchSubCategories(
            userSelectedCategory.Id,
        );
        setSubCategories(responsedSubCategories);
    }

    async function handleGetServices() {
        setCurrentCategory(selectedCategory);
        setCurrentSubCategory(selectedSubCategory);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 20 }}>
            <Paper
                elevation={10}
                sx={{
                    bgcolor: "background.default",
                    p: 2,
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                >
                    <Grid item xs={12} sm={12} md={6} lg={4} sx={{ mb: 1 }}>
                        <ESelect
                            label={t("category")}
                            value={selectedCategory}
                            onChange={(e) =>
                                handleSelectCategory(
                                    e.target.value as unknown as ICategory,
                                )
                            }
                            SelectProps={{
                                renderValue: (select) => (
                                    <Chip
                                        color="primary"
                                        label={(select as ICategory).Name_L2}
                                        component={Paper}
                                        elevation={10}
                                        sx={{ borderRadius: 1 }}
                                    />
                                ),
                            }}
                            options={categories.map((category) => ({
                                label: category.Name_L2,
                                value: category,
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} sx={{ mb: 1 }}>
                        <ESelect
                            color="primary"
                            autoFocus
                            disabled={!selectedCategory.Id}
                            value={selectedSubCategory}
                            label={t("subCategory")}
                            onChange={(e) =>
                                setSelectedSubCategory(
                                    e.target.value as unknown as ISubCategory,
                                )
                            }
                            SelectProps={{
                                renderValue: (select) => (
                                    <Chip
                                        label={(select as ISubCategory).Name_L2}
                                        color="primary"
                                        component={Paper}
                                        elevation={10}
                                        sx={{ borderRadius: 1 }}
                                    />
                                ),
                            }}
                            options={subCategories.map((subCategory) => ({
                                label: subCategory.Name_L2,
                                value: subCategory,
                            }))}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={4}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <Button
                            variant={buttonVariant}
                            endIcon={<SearchIcon />}
                            size="large"
                            sx={{ borderRadius: 0, mt: 3, height: 50 }}
                            onClick={handleGetServices}
                            onMouseEnter={(_) => setButtonVariant("contained")}
                            onMouseLeave={(_) => setButtonVariant("outlined")}
                            disabled={
                                !selectedCategory.Id || !selectedSubCategory.Id
                            }
                        >
                            {t("show")}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
