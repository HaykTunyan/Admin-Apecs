import requestAPI from "@/utils/axiosInstance";
import axios from "axios";

export async function deleteByType(type: string,id: string) {
    try {
        const response = await requestAPI.delete(`/${type}/${id}`);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data) {
                return error.response.data;
            }
        }
    }
}
