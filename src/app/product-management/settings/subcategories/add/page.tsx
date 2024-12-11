import React from "react";
import AddSub from "@/containers/productManagement/subCategories/addSub";

const emptyCategory = {
    id: "",
    name: "",
    description: "",
    category: {
        id: "",
        name: "",
        description: "",
    },
    image: null
};

const CategoryAdd = () => {
    return (
        <AddSub currentSubcategory={emptyCategory} edit={false}/>
    );
};

export default CategoryAdd;
