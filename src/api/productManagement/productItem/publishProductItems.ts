import requestAPI from "@/utils/axiosInstance";

export async function publishProductItems(
    ids: string[],
) {
    try {
        const response = await requestAPI.put(`/product-items/publish`, {
            ids: ids
        });

        return response;
    } catch (error) {
        return error;
    }
}
