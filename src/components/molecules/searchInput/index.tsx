import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function SerchInput() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{
                maxWidth: 730,
            }}
            spacing={0}
        >
            <Grid
                item
                xs
                sx={{
                    bgcolor: "grey.300",
                    height: 42,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    borderRadius: 1,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                <InputBase
                    placeholder={t("search_for_services")}
                    inputProps={{ "aria-label": "search google maps" }}
                    type="search"
                    size="medium"
                />
            </Grid>
            <Grid item xs="auto">
                <Button
                    onClick={() => {
                        navigate("/service/filter");
                    }}
                    sx={{
                        height: "100%",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                    type="submit"
                    size="large"
                    aria-label="search"
                >
                    بحث
                    <SearchIcon
                        sx={{ color: "white", width: 20, height: 20 }}
                    />
                </Button>
            </Grid>
        </Grid>
    );
}
