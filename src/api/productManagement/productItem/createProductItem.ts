import requestAPI from "@/utils/axiosInstance";
import { IVersion } from "@/utils/types";

export async function createProductItem(
    product_id: string,
    commodity_code: string,
    price: string,
    is_published: boolean,
    valueIds: string[],
    componentIds: string[],
    versions: IVersion[],
    media: File[],
) {
    try {
        const formData = new FormData();

        formData.append("product_id", product_id);
        formData.append("commodity_code", commodity_code);
        formData.append("price", price);
        formData.append("is_published", JSON.stringify(is_published));
        valueIds.forEach((valueId, index) => {
            formData.append(`valueIds[${index}]`, valueId);
        });

        componentIds.forEach((componentId, index) => {
            formData.append(`componentIds[${index}]`, componentId);
        });

        versions.forEach((version, versionIndex) => {
            Object.entries(version).forEach(([key, value]) => {
                if (key !== "id") {
                    formData.append(`versions[${versionIndex}][${key}]`, String(value));
                }
            });
        });

        media.forEach((file, index) => {
            formData.append(`media`, file);
        });

        const response = await requestAPI.post("/product-items", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        return error;
    }
}
