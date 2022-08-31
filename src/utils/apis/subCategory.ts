import { ISubCategory } from "core/types/sub-category";
import ReactAxios from "utils/axios";

const url = process.env.REACT_APP_GET_LIST_CATEGORIES!;

export async function fetchSubCategories(
    categoryId: number,
): Promise<ISubCategory[]> {
    const response = await ReactAxios.get(url + `/${categoryId}/subcategories`);
    return response.data.Data;
}
