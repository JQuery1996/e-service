// import { ServiceTemplete } from "components/templetes";
import { useAppDispatch } from "app/hooks";
import { ServiceTemplete } from "components/templetes";
import { IService, Service, IForm } from "core/types";
import { Loader } from "features/loader/Loader";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceForm } from "utils/apis/form";
import { fetchService } from "utils/apis/service";
import { useLoader } from "utils/hooks/useLoader";

export interface ServicePageProps {}

const ServicePage: FC<ServicePageProps> = () => {
    const [currentService, setCurrentService] = useState<IService>(
        {} as IService,
    );
    const [currentServiceForm, setCurrentServiceForm] = useState<IForm | null>(
        null,
    );
    const { id: serviceId } = useParams();
    const dispatch = useAppDispatch();
    const { setLoadingState } = useLoader();

    useEffect(() => {
        async function loadService() {
            try {
                dispatch(setLoadingState(true));
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
    }, [dispatch, serviceId, setLoadingState]);

    console.log({ currentServiceForm });
    return !currentService.Id ? (
        <Loader />
    ) : (
        <ServiceTemplete
            service={currentService}
            serviceForm={currentServiceForm}
        />
    );
};
export default ServicePage;
