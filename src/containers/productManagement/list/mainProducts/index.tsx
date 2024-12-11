import React from "react";
import EmptyNotice from "@/containers/productManagement/emptyNotice";
import SearchEmptyTable from "@/containers/productManagement/searchEmptyTable";
import {GetMainProductsResponse} from "@/utils/types";
import MainProductsTable from "@/containers/productManagement/list/mainProducts/mainProductsTable";

interface ICategories {
    products: GetMainProductsResponse;
    searchValue: string;
    filtered: string;
}

const MainProducts = ({products, searchValue, filtered}: ICategories) => {
    if (products.count === 0) {
        if (!searchValue && !filtered) {
            return (
                <EmptyNotice
                    type={"mainProducts"}
                    link={"/product-management/list/main-product/add"}
                />
            );
        }

        if (searchValue) {
            return <SearchEmptyTable
                searchValue={searchValue}
                type={"mainProduct"}
                title={"Main Products"}
            />;
        }

        if (filtered) {
            return (
                <MainProductsTable
                    mainProducts={products}
                    searchValue={searchValue}
                />
            );
        }
    }

    return (
        <MainProductsTable
            mainProducts={products}
            searchValue={searchValue}
        />
    );
};

export default MainProducts;
