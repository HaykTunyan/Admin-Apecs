import requestAPI from "@/utils/axiosInstance";

export async function deleteAttribute(id: string): Promise<void> {
    try {
        const response = await requestAPI.delete(`/attributes/${id}`);

        return response.data;
    } catch (error) {
        throw error;
    }
}
