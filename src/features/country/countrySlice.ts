import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import type { ICountry } from "core/types/country";

const localStorageCountry = localStorage.getItem(
    process.env.REACT_APP_LOCAL_STORAGE_COUNTRY_KEY!,
);
// Country  initial State
const initialState: ICountry | null = localStorageCountry
    ? JSON.parse(localStorageCountry)
    : null;

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
