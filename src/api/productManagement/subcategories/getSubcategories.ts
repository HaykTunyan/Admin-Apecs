import requestAPI from "@/utils/axiosInstance";
import {GetSubCategoriesResponse} from "@/utils/types";

export async function getSubcategories(
    limit = 8,
    offset = 0,
    orderBy = "name",
    sort = "ASC",
    searchValue = ""
): Promise<GetSubCategoriesResponse> {
    try {
        const response = await requestAPI.get<GetSubCategoriesResponse>("/sub-categories", {
            params: {
                limit,
                offset,
                orderBy,
                sort,
                q: searchValue
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
