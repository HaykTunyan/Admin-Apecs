import requestAPI from "@/utils/axiosInstance";
import {IValue} from "@/containers/productManagement/attributes/addAttr";
import {ICategory} from "@/containers/productManagement/attributes/dropDownMultiple";
import axios from "axios";

export async function createAttribute(
    name: string,
    values: IValue[],
    categories: ICategory[],
    description: string,
    tag: string
) {
    try {
        const response = await requestAPI.post("/attributes", {
            name,
            values: values.map(i => {
                return {value: i.value};
            }),
            categories,
            description,
            type: tag
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
