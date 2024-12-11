import React from "react";
import AddAttr from "@/containers/productManagement/attributes/addAttr";

const emptyAttribute = {
    id: "",
    name: "",
    values: [],
    categories: [],
    description: "",
    type: ""
};

const CategoryAdd = () => {
    return (
        <AddAttr currentAttribute={emptyAttribute} edit={false}/>
    );
};

export default CategoryAdd;
