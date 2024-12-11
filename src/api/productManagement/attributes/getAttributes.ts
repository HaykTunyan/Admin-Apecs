import requestAPI from "@/utils/axiosInstance";
import {GetAttributesResponse} from "@/utils/types";

export async function getAttributes(
    limit = 50,
    offset = 0,
    orderBy = "name",
    sort = "ASC",
    searchValue = ""
): Promise<GetAttributesResponse> {
    try {
        const response = await requestAPI.get<GetAttributesResponse>("/attributes", {
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
