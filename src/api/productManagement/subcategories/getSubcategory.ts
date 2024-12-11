import {SubCategory} from "@/utils/types";
import requestAPI from "@/utils/axiosInstance";

export async function getSubcategoryById(id: string): Promise<SubCategory> {
    try {
        const response = await requestAPI.get<SubCategory>(`/sub-categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
