"use client";

import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {AttributeSingle} from "@/utils/types";
import AddAttr from "@/containers/productManagement/attributes/addAttr";
import {getAttribute} from "@/api/productManagement/attributes/getAttribute";

const SingleAttribute = () => {
    const {id} = useParams();
    const [currentAttribute, setCurrentAttribute] =
        useState<AttributeSingle | null>(null);

    useEffect(() => {
        getAttribute(id as string).then((res) => setCurrentAttribute(res));
    }, [id]);

    return (
        <>
            {
                currentAttribute &&
                <AddAttr currentAttribute={currentAttribute} edit={true}/>
            }
        </>
    );
};

export default SingleAttribute;
