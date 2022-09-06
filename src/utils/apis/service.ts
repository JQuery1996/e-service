import { IService } from "core/types";
import ReactAxios from "utils/axios";

const listOfServicesUrl = process.env.REACT_APP_LIST_OF_SERVICES;
const listOfServicesByCountryUrl =
    process.env.REACT_APP_GET_SERVICES_IN_COUNTRY;

export async function fetchServices(
    subCategoryId: number,
    countryId: number,
): Promise<IService[]> {
    const response = await ReactAxios.get(
        listOfServicesUrl + `/${subCategoryId}/${countryId}`,
    );
    return response.data.Data[0].Services;
}

export async function fetchServicesByCountry(
    countryId: number,
    subCategoryId: number | null,
    pageNumber: number,
    pageSize: number,
) {
    const restOfUrl =
        subCategoryId === null
            ? `/${countryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`
            : `/${countryId}/${subCategoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    const response = await ReactAxios.get(
        listOfServicesByCountryUrl + restOfUrl,
    );
    return {
        count: response.data.Data.Count as number,
        services: response.data.Data.Result as IService[],
    };
}

export async function fetchService(serviceId: number) {
    const response = await ReactAxios.get(listOfServicesUrl + `/${serviceId}`);
    return response.data.Data;
}
