import {Category} from "@/utils/types";
import requestAPI from "@/utils/axiosInstance";

export async function getCategoryById(id: string): Promise<Category> {
    try {
        const response = await requestAPI.get<Category>(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
