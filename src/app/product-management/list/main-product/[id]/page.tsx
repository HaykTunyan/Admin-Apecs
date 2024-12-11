"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {MainProduct} from "@/utils/types";
import {getMainProduct} from "@/api/productManagement/mainProduct/getMainProduct";
import AddMainProduct from "@/containers/productManagement/list/mainProducts/add";

const SingleMainProduct = () => {
    const {id} = useParams();
    const [currentMainProduct, setCurrentMainProduct] = useState<MainProduct | null>(null);

    useEffect(() => {
        getMainProduct(id as string)
            .then(res => setCurrentMainProduct(res));
    }, [id]);

    return (
        <>
            {
                currentMainProduct && <AddMainProduct
                    currentMainProduct={currentMainProduct}
                    edit={true}
                />
            }
        </>
    );
};

export default SingleMainProduct;
