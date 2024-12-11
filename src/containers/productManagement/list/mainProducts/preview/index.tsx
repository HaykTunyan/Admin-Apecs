"use client";

import React from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import {MainProduct} from "@/utils/types";

export interface IRoute {
    name: string;
    link: string;
}

interface IAdd {
    currentMainProduct: MainProduct;
}

const PreviewMainProduct = ({currentMainProduct}: IAdd) => {
    const router = useRouter();

    const routes = [
        {
            name: "Products",
            link: "/product-management/list?itemType=mainProducts",
        },
        {
            name: `View the main product`,
            link: "",
        },
    ];

    const handleRedirectToEdit = () => {
        router.push(`/product-management/list/main-product/${currentMainProduct.id}`);
    };

    return (
        <div className={styles.addContainer}>
            <div className={styles.addContainerTop}>
                <Route
                    routes={routes}
                />
                <div className={styles.addTop}>
                    <span className={"text-32_n"}>View the main product</span>
                    <div className={styles.actionBtns}>
                        <button
                            onClick={() => router.back()}
                            className={"btnSec"}
                        >
                            <span>Close</span>
                        </button>
                        <button
                            onClick={handleRedirectToEdit}
                            className={"btnPrim"}
                        >
                            <span>Edit</span>
                        </button>
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.infoInner}>
                        <div className={styles.general}>
                            <span className={"text-16_20 text-grey-light-700"}>Main product</span>
                        </div>
                    </div>
                </div>
                <div className={styles.previewTable}>
                    <div className={styles.previewTitles}>
                        <div className={styles.selectedMainProduct}>
                            <span className={"text-18_28_inter text-default-primary"}>
                                {currentMainProduct?.name}
                            </span>
                        <div className={styles.subAndCat}>
                            <span className={"text-14_faux text-tertiary"}>
                                {currentMainProduct?.category.name} &gt; {currentMainProduct?.subCategory.name}
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.previewInfoRow}>
                            <span className={"text-16_20 text-grey-light-700 font-medium"}>Product category</span>
                            <span className={"text-16_24_inter text-tertiary"}>{currentMainProduct.category.name}</span>
                        </div>
                        <div className={styles.previewInfoRow}>
                            <span className={"text-16_20 text-grey-light-700 font-medium"}>Subcategory</span>
                            <span className={"text-16_24_inter text-tertiary"}>{currentMainProduct.subCategory.name}</span>
                        </div>
                        <div className={styles.previewInfoRow}>
                            <span className={"text-16_20 text-grey-light-700 font-medium"}>Short description</span>
                            <span className={"text-16_24_inter text-tertiary"}>{currentMainProduct.short_description}</span>
                        </div>
                        <div className={styles.previewInfoRow}>
                            <span className={"text-16_20 text-grey-light-700 font-medium"}>Long description</span>
                            <span className={"text-16_24_inter text-tertiary"}>{currentMainProduct.long_description}</span>
                        </div>
                        <div className={styles.previewInfoRowStatus}>
                            <span className={"text-16_20 text-grey-light-700 font-medium"}>Status</span>
                            {
                                currentMainProduct.is_active
                                    ? <div className={styles.statusBadge}>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="_Dot">
                                                <circle id="Dot" cx="4" cy="4" r="3" fill="#17B26A"/>
                                            </g>
                                        </svg>
                                        <span className={"text-12_18 text-utility-success"}>Active</span>
                                    </div>
                                    : <div className={styles.inactiveBadge}>
                                        <span className={"text-12_18 text-grey-light-700"}>Inactive</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.addBottom}>
                <span className={"text-32_n"}></span>
                <div className={styles.actionBtns}>
                    <button
                        onClick={() => router.back()}
                        className={"btnSec"}
                    >
                        <span>Close</span>
                    </button>
                    <button
                        className={"btnPrim"}
                        onClick={handleRedirectToEdit}
                    >
                        <span>Edit</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewMainProduct;
