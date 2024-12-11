"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {ProductItem} from "@/utils/types";
import {getProductItem} from "@/api/productManagement/productItem/getProductItem";
import PreviewProductItem from "@/containers/productManagement/list/productItems/preview";

const MainProductPreview = () => {
    const {id} = useParams();
    const [currentProductItem, setCurrentProductItem] = useState<ProductItem | null>(null);

    useEffect(() => {
        getProductItem(id as string)
            .then(res => setCurrentProductItem(res));
    }, [id]);

    return (
        <>
            {
                currentProductItem &&
                <PreviewProductItem currentProductItem={currentProductItem}/>
            }
        </>

    );
};

export default MainProductPreview;
