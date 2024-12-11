import requestAPI from "@/utils/axiosInstance";

export async function updateSubcategory(
    id: string,
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

        const response = await requestAPI.put(`/sub-categories/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;

    } catch (error) {
        throw error;
    }
}
