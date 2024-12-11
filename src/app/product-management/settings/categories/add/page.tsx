import React, {Fragment} from "react";
import Add from "@/containers/productManagement/categories/add";

const emptyCategory = {
    id: "",
    name: "",
    description: "",
    assembly_required: false,
    subCategories: [],
    attributes: [],
};

const CategoryAdd = () => {
    return (
        <>
            <Add currentCategory={emptyCategory} edit={false}/>
        </>
    );
};

export default CategoryAdd;
