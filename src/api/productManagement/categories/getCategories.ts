import requestAPI from "@/utils/axiosInstance";
import {GetCategoriesResponse} from "@/utils/types";

export async function getCategories(
    limit = 8,
    offset = 0,
    orderBy = "name",
    sort = "ASC",
    searchValue = ""
): Promise<GetCategoriesResponse> {
    try {
        const response = await requestAPI.get<GetCategoriesResponse>("/categories", {
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
