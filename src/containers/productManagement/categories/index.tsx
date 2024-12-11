import React from "react";
import EmptyNotice from "@/containers/productManagement/emptyNotice";
import CategoriesTable from "@/containers/productManagement/categories/categoriesTable";
import {GetCategoriesResponse} from "@/utils/types";

interface ICategories {
    categories: GetCategoriesResponse;
    searchValue: string;
}

const Categories = ({categories, searchValue}: ICategories) => {
    return (
        <>
            {
                categories.count === 0 && !searchValue ? <EmptyNotice
                        type={"categories"}
                        link={"/product-management/settings/categories/add"}
                    />
                    : <CategoriesTable
                        categories={categories}
                        searchValue={searchValue}
                    />
            }
        </>
    );
};

export default Categories;
