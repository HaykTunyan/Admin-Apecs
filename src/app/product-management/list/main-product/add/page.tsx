import React from "react";
import AddMainProduct from "@/containers/productManagement/list/mainProducts/add";

const emptyMainProducts = {
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
        assembly_required: false,
        subCategories: [],
        attributes: []
    },
    subCategory: {
        id: "",
        name: "",
        description: "",
        category: [],
        image: []
    }
};

const CategoryAdd = () => {
    return (
        <>
            <AddMainProduct currentMainProduct={emptyMainProducts} edit={false}/>
        </>
    );
};

export default CategoryAdd;
