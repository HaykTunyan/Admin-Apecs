import requestAPI from "@/utils/axiosInstance";
import {IVersion} from "@/utils/types";

export async function updateProductItem(
    id: string,
    commodity_code: string,
    price: string,
    is_published: boolean,
    valueIds: string[],
    componentIds: string[],
    versions: IVersion[],
    media: File[],
    delete_media_ids: string[]
) {
    try {
        const formData = new FormData();

        formData.append("commodity_code", commodity_code);
        formData.append("price", price);
        formData.append("is_published", JSON.stringify(is_published));
        valueIds.forEach((valueId, index) => {
            formData.append(`valueIds[${index}]`, valueId);
        });

        if(componentIds.length > 0) {
            componentIds.forEach((componentId, index) => {
                formData.append(`componentIds[${index}]`, componentId);
            });
        }

        versions.forEach((version, versionIndex) => {
            Object.entries(version).forEach(([key, value]) => {
                formData.append(`versions[${versionIndex}][${key}]`, String(value));
            });
        });

        media.forEach((file, index) => {
            formData.append(`media`, file);
        });

        delete_media_ids.forEach((deleteID, index) => {
            formData.append(`delete_media_ids[${index}]`, deleteID);
        });

        const response = await requestAPI.put(`/product-items/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        return error;
    }
}
