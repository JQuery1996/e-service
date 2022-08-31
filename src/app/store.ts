import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { authUserReducer } from "../features/auth-user/authUserSlice";
import { countryReducer } from "../features/country/countrySlice";
import { loaderReducer } from "../features/loader/loaderSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        user: authUserReducer,
        country: countryReducer,
        loader: loaderReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

setupListeners(store.dispatch);
