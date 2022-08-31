import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { useLoader } from "utils/hooks/useLoader";
import { fetchCategories } from "utils/apis";
import { ICategory } from "core/types";

export function useSideEffect(
    setCategories: Dispatch<SetStateAction<ICategory[]>>,
) {
    const dispatch = useAppDispatch();
    const { setLoadingState } = useLoader();
    return useEffect(() => {
        console.log("From Filterbar useSideEffect");
        async function loadCategories() {
            try {
                dispatch(setLoadingState(true));
                const responsedCategories = await fetchCategories();
                setCategories(responsedCategories);
                dispatch(setLoadingState(false));
            } catch (error) {
                console.log(error);
                setCategories([]);
                dispatch(setLoadingState(false));
            }
        }
        loadCategories();
    }, [dispatch, setCategories, setLoadingState]);
}
