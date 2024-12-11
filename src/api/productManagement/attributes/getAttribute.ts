import requestAPI from "@/utils/axiosInstance";
import {AttributeSingle} from "@/utils/types";

export async function getAttribute(id: string): Promise<AttributeSingle> {
    try {
        const response = await requestAPI.get<AttributeSingle>(`/attributes/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
