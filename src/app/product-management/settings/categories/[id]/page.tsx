"use client";

import React, {useEffect, useState} from "react";
import Add from "@/containers/productManagement/categories/add";
import {Category} from "@/utils/types";
import {getCategoryById} from "@/api/productManagement/categories/getCategory";
import {useParams} from "next/navigation";

const SingleCategory = () => {
    const {id} = useParams();
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

    useEffect(() => {
        getCategoryById(id as string)
            .then(res => setCurrentCategory(res));
    }, [id]);

    return (
        <>
            {
                currentCategory && <Add
                    currentCategory={currentCategory}
                    edit={true}
                />
            }
        </>
    );
};

export default SingleCategory;
