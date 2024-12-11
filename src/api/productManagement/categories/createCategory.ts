import requestAPI from "@/utils/axiosInstance";

export async function createCategory(name: string, description: string, isDifficult: boolean) {
    try {
        const response = await requestAPI.post("/categories", {
            name,
            description,
            assembly_required: isDifficult
        });

        return response;

    } catch (error) {
        return error;
    }
}
