import { ICategory } from "core/types";
import ReactAxios from "utils/axios";

const url = process.env.REACT_APP_GET_LIST_CATEGORIES!;
export async function fetchCategories(): Promise<ICategory[]> {
    const response = await ReactAxios.get(url);
    return response.data.Data;
}
