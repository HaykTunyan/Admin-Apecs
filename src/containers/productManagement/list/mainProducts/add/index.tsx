"use client";

import React, {ChangeEvent, useEffect, useState} from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import {ICategory} from "@/containers/productManagement/dropDown";
import {getCategories} from "@/api/productManagement/categories/getCategories";
import {MainProduct} from "@/utils/types";
import ProductInfo from "@/containers/productManagement/list/mainProducts/productInfo";
import {createMainProduct} from "@/api/productManagement/mainProduct/createMainProduct";
import {getSubcategories} from "@/api/productManagement/subcategories/getSubcategories";
import DeleteModal from "@/containers/productManagement/categories/deleteModal";
import {updateMainProduct} from "@/api/productManagement/mainProduct/updateMainProduct";
import {showToast} from "@/store/slices/toastSlice";
import {useDispatch} from "react-redux";

export interface IRoute {
    name: string;
    link: string;
}

interface IAdd {
    edit: boolean;
    currentMainProduct: MainProduct;
}

const AddMainProduct = ({edit, currentMainProduct}: IAdd) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [productName, setProductName] = useState<string>(edit ? currentMainProduct.name : "");
    const [shortDescription, setShortDescription] = useState<string>(edit ? currentMainProduct.short_description : "");
    const [longDescription, setLongDescription] = useState<string>(edit ? currentMainProduct.long_description : "");
    const [metaTitle, setMetaTitle] = useState<string>(edit ? currentMainProduct.meta_title : "");
    const [isActive, setIsActive] = useState<boolean>(edit ? currentMainProduct.is_active : false);
    const [metaDesc, setMetaDesc] = useState<string>(edit ? currentMainProduct.meta_description : "");
    const [isDeleteRequested, setIsDeleteRequested] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(currentMainProduct.category.name ? currentMainProduct.category :{
        id: "",
        name: "",
    });
    const [selectedSubCategory, setSelectedSubCategory] = useState<ICategory>(currentMainProduct.subCategory.name ? currentMainProduct.subCategory : {
        id: "",
        name: "",
    });

    const routes = [
        {
            name: "Products",
            link: "/product-management/list?itemType=mainProducts",
        },
        {
            name: `${edit ? "Edit" : "Add a"} main product`,
            link: "",
        },
    ];

    useEffect(() => {
        getCategories(50)
            .then((res) => setCategories(res.rows));
        getSubcategories(50)
            .then((res) => setSubCategories(res.rows));
    }, []);

    const disabled = !productName || isProcessing || !selectedCategory.id || !selectedSubCategory.id || !shortDescription;

    useEffect(() => {
        if (isDeleteRequested) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isDeleteRequested]);

    const handleSubmit = () => {
        setIsProcessing(true);

        if (edit) {
            updateMainProduct(
                currentMainProduct.id,
                selectedCategory.id,
                selectedSubCategory.id,
                productName,
                shortDescription,
                longDescription,
                metaTitle,
                metaDesc,
                isActive
            )
                .then((res: any) => {
                    setIsProcessing(false);

                    if (res.message.includes("There should be only one product in the selected category and subcategory.")) {
                        setIsDeleteRequested(false);
                        dispatch(showToast({
                            title: "Failed to add/edit the main product",
                            message: res.message,
                            type: "error"
                        }));
                        return;
                    }

                    window.location.reload();
                })
                .catch(() => setIsProcessing(false));
        } else {
            createMainProduct(
                selectedCategory.id,
                selectedSubCategory.id,
                productName,
                shortDescription,
                longDescription,
                metaTitle,
                metaDesc,
                isActive
            )
                .then((res) => {
                    setIsProcessing(false);

                    if (res.message.includes("There should be only one product in the selected category and subcategory.")) {
                        setIsDeleteRequested(false);
                        dispatch(showToast({
                            title: "Failed to add/edit the main product",
                            message: res.message,
                            type: "error"
                        }));
                        return;
                    }

                    router.push("/product-management/list?itemType=mainProducts");
                })
                .catch(() => setIsProcessing(false));
        }
    };

    const handleDeleteCategory = () => {
        setIsDeleteRequested(true);
    };

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        const currentName = e.currentTarget.value.trimStart();
        setProductName(currentName);
    };

    const handleShortDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const currentShortDesc = e.currentTarget.value.trimStart();
        setShortDescription(currentShortDesc);
    };

    return (
        <div className={styles.addContainer}>
            {
                isDeleteRequested && <DeleteModal
                    id={currentMainProduct.id}
                    otherPage={true}
                    type={"mainProduct"}
                    api={"products"}
                    name={currentMainProduct.name}
                    setIsDeleteRequested={setIsDeleteRequested}
                />
            }
            <div className={styles.addContainerTop}>
                <Route
                    routes={routes}
                />
                <div className={styles.addTop}>
                    <span className={"text-32_n"}>{edit ? "Edit the" : "Add a"} main product</span>
                    <div className={styles.actionBtns}>
                        <button
                            onClick={() => router.back()}
                            className={"btnSec"}
                        >
                            <span>Back</span>
                        </button>
                        <button
                            className={"btnPrim"}
                            disabled={disabled}
                            onClick={handleSubmit}
                        >
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.infoInner}>
                        <div className={styles.general}>
                            <span className={"text-16_20 text-grey-light-700"}>General information</span>
                            <span className={"text-14_faux text-tertiary"}>
                                Enter essential parent product details, including categories, name, description,
                                and other key information, that form the foundation of the product structure.
                            </span>
                        </div>
                        <ProductInfo
                            edit={edit}
                            isActive={isActive}
                            setIsActive={setIsActive}
                            productName={productName}
                            setProductName={handleNameInput}
                            setMetaTitle={setMetaTitle}
                            metaTitle={metaTitle}
                            metaDesc={metaDesc}
                            setMetaDesc={setMetaDesc}
                            longDescription={longDescription}
                            setLongDescription={setLongDescription}
                            shortDescription={shortDescription}
                            setShortDescription={handleShortDesc}
                            categories={categories}
                            subCategories={subCategories}
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            setSelectedCategory={setSelectedCategory}
                            setSelectedSubCategory={setSelectedSubCategory}
                        />
                    </div>
                </div>
                {
                    edit && <div className={styles.mainProductDelete}>
                        <div className={styles.mainProductTexts}>
                            <span className={"text-utility-gray-700"}>Product deletion</span>
                            <span className={"text-14_faux text-tertiary"}>
                                Clicking &apos;Delete Product&apos; will permanently remove the product,
                                including all associated information and variants, from the catalog.
                            </span>
                        </div>
                        <button
                            onClick={handleDeleteCategory}
                            className={"btnDelete"}
                        >
                            Delete this product
                        </button>
                    </div>
                }
            </div>
            <div className={styles.addBottom}>
                <span className={"text-32_n"}></span>
                <div className={styles.actionBtns}>
                    <button
                        onClick={() => router.back()}
                        className={"btnSec"}
                    >
                        <span>Back</span>
                    </button>
                    <button
                        className={"btnPrim"}
                        disabled={disabled}
                        onClick={handleSubmit}
                    >
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMainProduct;
