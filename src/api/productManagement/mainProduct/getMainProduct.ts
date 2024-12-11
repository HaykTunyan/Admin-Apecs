import requestAPI from "@/utils/axiosInstance";
import {MainProduct} from "@/utils/types";

export async function getMainProduct(id: string): Promise<MainProduct> {
    try {
        const response = await requestAPI.get<MainProduct>(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
