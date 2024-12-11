import requestAPI from "@/utils/axiosInstance";

export async function createSubcategory(
    name: string,
    description: string,
    categoryId: string,
    image: File | null
): Promise<any> {
    try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("categoryId", categoryId);

        if (image) {
            formData.append("image", image);
        }

        const response = await requestAPI.post("/sub-categories", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;

    } catch (error) {
        throw error;
    }
}
