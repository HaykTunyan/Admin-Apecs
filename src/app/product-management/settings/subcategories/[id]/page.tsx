"use client";

import React, {Fragment, useEffect, useState} from "react";
import AddSub from "@/containers/productManagement/subCategories/addSub";
import {useParams} from "next/navigation";
import {SubCategory} from "@/utils/types";
import {getSubcategoryById} from "@/api/productManagement/subcategories/getSubcategory";

const SingleCategory = () => {
    const {id} = useParams();
    const [currentSubcategory, setCurrentSubcategory] = useState<SubCategory | null>(null);

    useEffect(() => {
        getSubcategoryById(id as string)
            .then(res => setCurrentSubcategory(res));
    }, [id]);

    return (
        <>
            {
                currentSubcategory && <AddSub
                    currentSubcategory={currentSubcategory}
                    edit={true}
                />
            }
        </>
    );
};

export default SingleCategory;
