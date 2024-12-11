import requestAPI from "@/utils/axiosInstance";

export async function updateMainProduct(
    id: string,
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
        const response = await requestAPI.put(`/products/${id}`, {
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
        return error;
    }
}
