import { Dispatch, SetStateAction, useEffect } from "react";
import type { ISubCategory } from "core/types/sub-category";
import { useAppDispatch } from "app/hooks";
import { useLoader } from "utils/hooks/useLoader";
import ReactAxios from "utils/axios";
import { toast, Theme } from "react-toastify";

export function useSideEffect(
    Id: number,
    setSubCategories: Dispatch<SetStateAction<ISubCategory[]>>,
) {
    const dispatch = useAppDispatch();
    const { setLoadingState } = useLoader();
    useEffect(() => {
        async function getSubCategoriesList() {
            try {
                await dispatch(setLoadingState(true));
                const response = await ReactAxios.get(
                    process.env.REACT_APP_GET_LIST_CATEGORIES! +
                        `/${Id}/subcategories`,
                );
                await setSubCategories(response.data.Data);
                await dispatch(setLoadingState(false));
            } catch (error) {
                await dispatch(setLoadingState(false));
                toast.error((error as Error).message, {
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
            }
        }
        getSubCategoriesList();
    }, [Id, dispatch, setLoadingState, setSubCategories]);
}
