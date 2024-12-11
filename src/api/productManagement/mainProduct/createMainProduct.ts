import requestAPI from "@/utils/axiosInstance";
import axios from "axios";

export async function createMainProduct(
    category_id: string,
    sub_category_id: string,
    name: string,
    short_description: string,
    long_description: string,
    meta_title: string,
    meta_description: string,
    is_active: boolean
) {
    try {
        const response = await requestAPI.post("/products", {
            category_id,
            sub_category_id,
            name,
            short_description,
            long_description,
            meta_title,
            meta_description,
            is_active
        });

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data) {
                return error.response.data;
            }
        }
    }
}
