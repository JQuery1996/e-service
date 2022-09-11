import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decode } from "../../utils/decode-token";
import { RootState } from "../../app/store";

export interface IAuthUserSlice {
    Id: number;
    email: string;
    exp: number;
    iat: number;
    jti: string;
    nbf: number;
    role: string;
    sub: string;
    username: string;
}

const initialState: IAuthUserSlice | null = localStorage.getItem(
    process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY!,
)
    ? decode(
          localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY!)!,
      )
    : null;

export const authUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<IAuthUserSlice | null>) =>
            (state = action.payload),
    },
});

// export user actions
export const { setAuthUser } = authUserSlice.actions;

// export user selector
export const selectAuthUser = (state: RootState) => state.user;

// export user reducre
export const authUserReducer = authUserSlice.reducer;
