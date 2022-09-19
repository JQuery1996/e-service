import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import type { ICountry } from "core/types/country";

const COUNTRY_LOCAL_STOARGE_TOKEN =
    process.env.REACT_APP_LOCAL_STORAGE_COUNTRY_KEY!;

const DEFAULT_COUNTRY = {
    Id: 1,
    Name_L1: "Syria",
    Name_L2: "سوريا",
    Name_L3: "Syrie",
};

const localStorageCountry = localStorage.getItem(COUNTRY_LOCAL_STOARGE_TOKEN);

if (!localStorageCountry)
    localStorage.setItem(
        COUNTRY_LOCAL_STOARGE_TOKEN,
        JSON.stringify(DEFAULT_COUNTRY),
    );

// Country  initial State
const initialState: ICountry | null = localStorageCountry
    ? JSON.parse(localStorageCountry)
    : DEFAULT_COUNTRY;

// create Country Slice
export const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        getCountry: (state) => state,
        setCountry: (state, action: PayloadAction<ICountry | null>) =>
            (state = action.payload),
    },
});

// export country action
export const { getCountry, setCountry } = countrySlice.actions;

// export country selector
export const selectCountry = (state: RootState) => state.country;

// export country reducer
export const countryReducer = countrySlice.reducer;
