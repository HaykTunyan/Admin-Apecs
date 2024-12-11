"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {ProductItem} from "@/utils/types";
import AddProductItem from "@/containers/productManagement/list/productItems/add";
import {getProductItem} from "@/api/productManagement/productItem/getProductItem";

const SingleMainProduct = () => {
    const {id} = useParams();
    const [currentProductItem, setCurrentProductItem] = useState<ProductItem | null>(null);

    useEffect(() => {
        getProductItem(id as string)
            .then(res => setCurrentProductItem(res));
    }, [id]);

    return (
        <>
            {
                currentProductItem && <AddProductItem edit={true} currentProductItem={currentProductItem}/>
            }
        </>
    );
};

export default SingleMainProduct;
