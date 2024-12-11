import React from "react";
import EmptyNotice from "@/containers/productManagement/emptyNotice";
import SearchEmptyTable from "@/containers/productManagement/searchEmptyTable";
import {GetProductItemsResponse} from "@/utils/types";
import ProductItemsTable from "@/containers/productManagement/list/productItems/productItemsTable";

interface ICategories {
    products: GetProductItemsResponse;
    searchValue: string;
    filtered: string;
}

const ProductItems = ({products, searchValue, filtered}: ICategories) => {
    if (products.count === 0) {
        if (!searchValue && !filtered) {
            return (
                <EmptyNotice
                    type={"productItems"}
                    link={"/product-management/list/product-item/add"}
                />
            );
        }

        if (searchValue) {
            return <SearchEmptyTable
                type={"productItem"}
                title={"Product Items"}
                searchValue={searchValue}
            />;
        }

        if (filtered) {
            return (
                <ProductItemsTable
                    products={products}
                    searchValue={searchValue}
                    filtered={true}
                />
            );
        }
    }

    return (
        <ProductItemsTable
            products={products}
            searchValue={searchValue}
        />
    );
};

export default ProductItems;
