import { Button, Grid, Link, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCountry } from "utils/hooks/useCounty";
import { useState } from "react";
import { ICountry } from "core/types/country";
import { useAppDispatch } from "app/hooks";
import { setCountry } from "features/country/countrySlice";
import { useLocalStorage } from "react-use";
import { useLoader } from "utils/hooks/useLoader";
import { Theme, toast } from "react-toastify";

export interface SelectCountryFormProps {}

export function SelectCountryForm({ ...props }) {
    const { t } = useTranslation();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [, setCountryInLocalStorage] = useLocalStorage(
        process.env.REACT_APP_LOCAL_STORAGE_COUNTRY_KEY!,
    );
    const { setLoadingState } = useLoader();
    const dispatch = useAppDispatch();
    useCountry(countries, setCountries);

    async function handleSelectCountry(selectedCountry: ICountry) {
        // setLoading to true
        await dispatch(setLoadingState(true));
        // first set global country state to the selected one
        await dispatch(setCountry(selectedCountry));
        // save selected Country in local storage
        await setCountryInLocalStorage(selectedCountry);
        // setLoading to false after we're finishing
        await dispatch(setLoadingState(false));
        const msg = `دولتك الحاليه هي ${selectedCountry.Name_L2}`;
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: process.env.REACT_APP_NOTIFICATION_THEME! as Theme,
        });
    }
    return countries.length > 0 ? (
        <Container>
            <div className="action-btn-div-select-country">
                <Grid container>
                    {countries.map((country) => (
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            md={4}
                            lg={3}
                            key={country.Id}
                            onClick={() => handleSelectCountry(country)}
                        >
                            <Link href="#">
                                <img
                                    src={require(`../../../assets/images/${country.Name_L1.toLowerCase()}-flag.png`)}
                                    alt=""
                                />
                            </Link>
                        </Grid>
                    ))}
                </Grid>

                <Button className="action-btn" size="large">
                    {t("next")}
                </Button>
            </div>
        </Container>
    ) : null;
}
