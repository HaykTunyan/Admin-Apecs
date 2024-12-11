"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {MainProduct} from "@/utils/types";
import {getMainProduct} from "@/api/productManagement/mainProduct/getMainProduct";
import PreviewMainProduct from "@/containers/productManagement/list/mainProducts/preview";

const MainProductPreview = () => {
    const {id} = useParams();
    const [currentMainProduct, setCurrentMainProduct] = useState<MainProduct | null>(null);

    useEffect(() => {
        getMainProduct(id as string)
            .then(res => setCurrentMainProduct(res));
    }, [id]);

    return (
        <>
            {
                currentMainProduct &&
                <PreviewMainProduct currentMainProduct={currentMainProduct}/>
            }
        </>

    );
};

export default MainProductPreview;
