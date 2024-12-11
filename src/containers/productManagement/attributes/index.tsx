import React from "react";
import EmptyNotice from "@/containers/productManagement/emptyNotice";
import AttributesTable from "@/containers/productManagement/attributes/attributesTable";
import {GetAttributesResponse} from "@/utils/types";

interface ISubCategories {
    currentAttributes: GetAttributesResponse;
    searchValue: string;
}

const Attributes = ({currentAttributes, searchValue}: ISubCategories) => {
    return (
        <>
            {
                currentAttributes.count === 0 && !searchValue ? <EmptyNotice
                        type={"attributes"}
                        link={"/product-management/settings/attributes/add"}
                    />
                    : <AttributesTable
                        currentAttributes={currentAttributes}
                        searchValue={searchValue}
                    />
            }
        </>
    );
};

export default Attributes;
