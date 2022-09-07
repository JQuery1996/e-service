import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ICurrency } from "core/types/currency";

const initialState = [] as ICurrency[];

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<ICurrency[]>) =>
            (state = action.payload),
    },
});

// export curreny action
export const { setCurrencies } = currencySlice.actions;

// export currency selector

export const selectCurrencies = (state: RootState) => state.currency;

// export currency reducer
export const currencyReducer = currencySlice.reducer;
