// import { ServiceTemplete } from "components/templetes";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ServiceTemplete } from "components/templetes";
import { IService, IForm } from "core/types";
import { Loader } from "features/loader/Loader";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceForm } from "utils/apis/form";
import { fetchService } from "utils/apis/service";
import { useLoader } from "utils/hooks/useLoader";
import {
    selectCurrencies,
    setCurrencies,
} from "features/currency/curreny-slice";
import ReactAxios from "utils/axios";

export interface ServicePageProps {}

const ServicePage: FC<ServicePageProps> = () => {
    const [currentService, setCurrentService] = useState<IService>(
        {} as IService,
    );
    const [currentServiceForm, setCurrentServiceForm] = useState<IForm | null>(
        null,
    );
    const currencies = useAppSelector(selectCurrencies);

    const { id: serviceId } = useParams();
    const dispatch = useAppDispatch();
    const { setLoadingState } = useLoader();

    useEffect(() => {
        async function loadService() {
            try {
                dispatch(setLoadingState(true));
                // fetch currencies if wasn't exist
                if (currencies.length === 0) {
                    const responsedCurrencies = await ReactAxios.get(
                        "/Currency",
                    );
                    dispatch(setCurrencies(responsedCurrencies.data.data));
                }
                const responsedService = await fetchService(+serviceId!);
                const responsedServiceForm = await fetchServiceForm(
                    +serviceId!,
                );
                setCurrentService(responsedService);
                setCurrentServiceForm(responsedServiceForm);
                dispatch(setLoadingState(false));
            } catch (error) {
                console.log(error);
                dispatch(setLoadingState(false));
            }
        }
        loadService();
    }, [currencies.length, dispatch, serviceId, setLoadingState]);
    return !currentService.Id ? (
        <Loader />
    ) : (
        <ServiceTemplete
            service={currentService}
            serviceForm={currentServiceForm}
            currencies={currencies}
        />
    );
};
export default ServicePage;
