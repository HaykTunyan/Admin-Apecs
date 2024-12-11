import requestAPI from "@/utils/axiosInstance";

export async function updateCategory(id: string, name: string, description: string, isDifficult: boolean) {
    try {
        const response = await requestAPI.put(`/categories/${id}`, {
            name,
            description,
            assembly_required: isDifficult
        });

        return response;

    } catch (error) {
        return error;
    }
}
