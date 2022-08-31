import { useAppSelector } from "app/hooks";
import { selectLoader, setLoadingState } from "features/loader/loaderSlice";
export function useLoader() {
    const isLoading = useAppSelector(selectLoader);
    return { isLoading, setLoadingState };
}
