import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FilterBar } from "components/molecules/filter-bar";
import { useLoader } from "utils/hooks/useLoader";
import { ICategory, IService, ISubCategory } from "core/types";
import { Container } from "@mui/material";
import { ServiceCardContainer } from "components/molecules";
import { Pagination } from "components/atoms";
import { fetchServicesByCountry } from "utils/apis/service";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCountry } from "features/country/countrySlice";
import { Loader } from "features/loader/Loader";
export interface HomeTempleteProps {}

export const HomeTemplete: FC<HomeTempleteProps> = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const country = useAppSelector(selectCountry)!;
    const { isLoading, setLoadingState } = useLoader();

    // ------------------------------ state ------------------------------------ //
    // current Category from select input ...

    const [currentCategory, setCurrentCategory] = useState<ICategory>(
        {} as ICategory,
    );
    // current Sub-Category from select input too...
    const [currentSubCategory, setCurrentSubCategory] = useState<ISubCategory>(
        {} as ISubCategory,
    );

    // list of all service from specfic sub-category and the country of the user...
    const [services, setServices] = useState<IService[]>([]);

    // total count of services
    const [totalCount, setTotalCount] = useState<number>(0);

    // current page
    const [currentPage, setCurrentPage] = useState<number>(1);

    // ------------------------------ state ------------------------------------ //

    // ------------------------------ effect ----------------------------------- //

    useEffect(() => {
        async function loadData() {
            try {
                // show loading while fetching white fetching data
                dispatch(setLoadingState(true));
                // get list of services
                const { count, services } = await fetchServicesByCountry(
                    country.Id,
                    currentSubCategory.Id || null,
                    currentPage,
                    +process.env.REACT_APP_PER_PAGE!,
                );
                // after finish fetching => hide loading indicator by set loading indicator to false
                await setTotalCount(count);
                await setServices(services);
                // window.scrollTo(0, 0);
                dispatch(setLoadingState(false));
            } catch (error) {
                console.log(error);
                dispatch(setLoadingState(false));
            }
        }
        loadData();
    }, [
        country.Id,
        currentPage,
        currentSubCategory.Id,
        dispatch,
        setLoadingState,
        setServices,
        setTotalCount,
    ]);
    // ------------------------------ effect ----------------------------------- //

    return (
        <>
            {isLoading && <Loader />}

            <FilterBar
                setCurrentCategory={setCurrentCategory}
                setCurrentSubCategory={setCurrentSubCategory}
            />

            <Container>
                <ServiceCardContainer services={services} />
            </Container>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalCount={totalCount}
            />
        </>
    );
};
