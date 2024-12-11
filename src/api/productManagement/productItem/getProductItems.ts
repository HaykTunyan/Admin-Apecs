import requestAPI from "@/utils/axiosInstance";
import { GetProductItemsResponse } from "@/utils/types";

export async function getProductItems(
    limit = 50,
    offset = 0,
    orderBy = "sku",
    sort = "ASC",
    searchValue = "",
    statusItem = "",
    mainProduct = ""
): Promise<GetProductItemsResponse> {
    try {
        const params: Record<string, any> = {
            limit,
            offset,
            orderBy,
            sort,
            q: searchValue
        };

        if (statusItem) {
            params.is_published = statusItem === "live on site";
        }
        if (mainProduct) {
            params.productIds = mainProduct;
        }

        const response = await requestAPI.get<GetProductItemsResponse>("/product-items", {
            params
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
