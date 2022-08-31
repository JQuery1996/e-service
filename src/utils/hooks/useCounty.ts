import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { useLoader } from "./useLoader";
import ReactAxios from "utils/axios";
import { ICountry } from "core/types/country";

export function useCountry(
    countries: ICountry[],
    setCountries: Dispatch<SetStateAction<ICountry[]>>,
) {
    const { setLoadingState } = useLoader();
    const dispatch = useAppDispatch();
    useEffect(() => {
        async function fetchCountry() {
            try {
                dispatch(setLoadingState(true));
                const response = await ReactAxios.get(
                    process.env.REACT_APP_GET_COUNTRIES!,
                );
                setCountries(response.data.Data);
                dispatch(setLoadingState(false));
            } catch (error) {
                dispatch(setLoadingState(false));
                console.log(error);
            }
        }
        fetchCountry();
    }, [setCountries, dispatch, setLoadingState]);
}
