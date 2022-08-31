import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// Loader state interface
export interface ILoader {
    isLoading: boolean;
}

// loader initial state
const initialState: ILoader = {
    isLoading: false,
};

// create loader slice
export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        getLoadingState: (state) => state,
        setLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

// expost loader actions
export const { getLoadingState, setLoadingState } = loaderSlice.actions;

// export loader selector
export const selectLoader = (state: RootState) => state.loader.isLoading;

// export loader reducer
export const loaderReducer = loaderSlice.reducer;
