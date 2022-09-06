import { IForm } from "core/types";
import ReactAxios from "utils/axios";

const url = process.env.REACT_APP_LIST_OF_SERVICES!;
export async function fetchServiceForm(serviceId: number): Promise<IForm> {
    const response = await ReactAxios.get(url + `/${serviceId}/Form`);
    return response.data.Data;
}
