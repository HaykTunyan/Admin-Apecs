import requestAPI from "@/utils/axiosInstance";
import {IValue} from "@/containers/productManagement/attributes/addAttr";
import {ICategory} from "@/containers/productManagement/attributes/dropDownMultiple";
import axios from "axios";

export async function updateAttribute(
    valueId: string,
    name: string,
    values: IValue[],
    categories: ICategory[],
    description: string,
    tag: string
) {
    try {
        const response = await requestAPI.put(`/attributes/${valueId}`, {
            name,
            values: values.map(({newValue, id, ...rest}) =>
                newValue ? rest : {...rest, id}
            ).map(i => {
                if ("id" in i) {
                    return {id: i.id, value: i.value};
                }
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
