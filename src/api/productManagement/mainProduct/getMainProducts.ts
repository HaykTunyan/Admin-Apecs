import requestAPI from "@/utils/axiosInstance";
import {GetMainProductsResponse} from "@/utils/types";

export async function getMainProducts(
    limit = 50,
    offset = 0,
    orderBy = "name",
    sort = "ASC",
    searchValue = "",
    status = "",
    coreFilter = ""
): Promise<GetMainProductsResponse> {
    try {
        const params: any = {
            limit,
            offset,
            orderBy,
            sort,
            q: searchValue,
        };

        if (coreFilter) {
            params.categoryIds = [coreFilter];
        }

        if (status) {
            params.is_active = status === "active";
        }

        const response = await requestAPI.get<GetMainProductsResponse>("/products", {
            params,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
