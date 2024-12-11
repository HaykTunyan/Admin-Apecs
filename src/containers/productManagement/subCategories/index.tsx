import React from "react";
import EmptyNotice from "@/containers/productManagement/emptyNotice";
import SubCategoriesTable from "@/containers/productManagement/subCategories/subCategoriesTable";
import {GetSubCategoriesResponse} from "@/utils/types";

interface ISubCategories {
    currentSubCategories: GetSubCategoriesResponse;
    searchValue: string;
}

const SubCategories = ({currentSubCategories, searchValue}: ISubCategories) => {
    const type = "subcategories";

    return (
        <>
            {
                currentSubCategories.count === 0 && !searchValue ? <EmptyNotice
                        type={type}
                        link={"/product-management/settings/subcategories/add"}
                    />
                    : <SubCategoriesTable
                        currentSubCategories={currentSubCategories}
                        searchValue={searchValue}
                    />
            }
        </>
    );
};

export default SubCategories;
