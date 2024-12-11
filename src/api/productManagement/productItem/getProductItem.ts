import requestAPI from "@/utils/axiosInstance";
import {ProductItem} from "@/utils/types";

export async function getProductItem(id: string): Promise<ProductItem> {
    try {
        const response = await requestAPI.get<ProductItem>(`/product-items/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
