import React from "react";
import AddProductItem from "@/containers/productManagement/list/productItems/add";

const emptyMainProducts = {
    commodity_code: "",
    id: "",
    is_published: false,
    price: "",
    product: {
        id: "",
        name: "",
        short_description: "",
        long_description: "",
        meta_title: "",
        meta_description: "",
        is_active: false,
        category: {
            id: "",
            name: "",
            description: "",
        },
        subCategory: {
            id: "",
            name: "",
            description: "",
        }
    },
    sku: "",
    versions: [],
    attributeValues: [],
    media: [],
    components: []
};

const CategoryAdd = () => {
    return (
        <>
            <AddProductItem currentProductItem={emptyMainProducts} edit={false}/>
        </>
    );
};

export default CategoryAdd;
