import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectAuthUser, setAuthUser } from "features/auth-user/authUserSlice";
import { useLoader } from "./useLoader";
import { decode } from "utils/decode-token";
import ReactAxios from "utils/axios";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { Theme, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function useAuth() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const authenticatedUser = useAppSelector(selectAuthUser);
    const dispatch = useAppDispatch();
    const { setLoadingState } = useLoader();
    const [, setToken, removeToken] = useLocalStorage(
        process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY!,
    );

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                dispatch(setLoadingState(true));
                const response = await ReactAxios.post(
                    process.env.REACT_APP_LOGIN_API!,
                    { Email: email, Password: password },
                );
                const responseToken = response.data;
                await setToken(responseToken);
                await dispatch(setAuthUser(decode(responseToken)));
                await dispatch(setLoadingState(false));
                navigate(process.env.REACT_APP_FRONT_END_HOME_PAGE!, {
                    replace: true,
                });
            } catch (error: any) {
                const msg = error?.response?.data?.errors?.[0];

                const translatedMsg = t(msg.split(" ").join("_"));
                toast.error(translatedMsg, {
                    position: "top-right",
                    rtl: true,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: process.env.REACT_APP_NOTIFICATION_THEME! as Theme,
                });
                dispatch(setLoadingState(false));
            }
        },
        [dispatch, setLoadingState, setToken, navigate, t],
    );

    const register = useCallback(
        async (username: string, email: string, password: string) => {
            try {
                dispatch(setLoadingState(true));
                const response = await ReactAxios.post(
                    process.env.REACT_APP_REGISTER_API!,
                    {
                        Username: username,
                        Email: email,
                        Password: password,
                    },
                );
                const responseToken = response.data.token;
                await setToken(responseToken);
                await dispatch(setAuthUser(decode(responseToken)));
                await dispatch(setLoadingState(false));
                navigate(process.env.REACT_APP_FRONT_END_HOME_PAGE!, {
                    replace: true,
                });
            } catch (error) {
                dispatch(setLoadingState(false));
                console.log(error);
            }
        },
        [dispatch, setLoadingState, setToken, navigate],
    );

    const logout = useCallback(async () => {
        await removeToken();
        await dispatch(setAuthUser(null));
        navigate(process.env.REACT_APP_FRONT_END_LOGIN_PAGE!);
    }, [dispatch, navigate, removeToken]);

    return { authenticatedUser, setAuthUser, login, register, logout };
}
