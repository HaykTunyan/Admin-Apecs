"use client";

import React, {useEffect, useState} from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import DeleteModal from "@/containers/productManagement/categories/deleteModal";
import {createCategory} from "@/api/productManagement/categories/createCategory";
import {Category} from "@/utils/types";
import {updateCategory} from "@/api/productManagement/categories/updateCategory";

export interface IRoute {
    name: string;
    link: string;
}

interface IAdd {
    edit: boolean;
    currentCategory: Category;
}

const Add = ({edit, currentCategory}: IAdd) => {
    const router = useRouter();
    const [name, setName] = useState<string>(edit ? currentCategory.name : "");
    const [description, setDescription] = useState<string>(edit ? currentCategory.description : "");
    const [isDeleteRequested, setIsDeleteRequested] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const disabled = !name || isProcessing;
    const [isDifficult, setIsDifficult] = useState<boolean>(edit ? currentCategory.assembly_required : false);

    const routes = [
        {
            name: "Product Management Settings",
            link: "/product-management/settings?filter=categories",
        },
        {
            name: `${edit ? "Edit" : "Add a"} category`,
            link: "",
        },
    ];

    const handleDeleteCategory = () => {
        setIsDeleteRequested(true);
    };

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
            updateCategory(currentCategory.id, name, description, isDifficult)
                .then(() => {
                    setIsProcessing(false);
                    window.location.reload();
                })
                .catch(() => setIsProcessing(false));
        } else {
            createCategory(name, description, isDifficult)
                .then(() => {
                    setIsProcessing(false);
                    router.push("/product-management/settings?filter=categories");
                })
                .catch(() => setIsProcessing(false));
        }
    };

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentName = e.currentTarget.value.trimStart();
        setName(currentName);
    };

    return (
        <div className={styles.addContainer}>
            {
                isDeleteRequested && <DeleteModal
                    otherPage={true}
                    id={currentCategory.id}
                    type={"category"}
                    api={"categories"}
                    name={currentCategory.name}
                    setIsDeleteRequested={setIsDeleteRequested}
                />
            }
            <div className={styles.addContainerTop}>
                <Route
                    routes={routes}
                />
                <div className={styles.addTop}>
                    <span className={"text-32_n"}>{edit ? "Edit the" : "Add a"} category</span>
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
                    <div className={styles.left}>
                        <span className={"text-utility-gray-700"}>Category information</span>
                        <span className={"text-14_faux text-tertiary"}>Basic information about the category</span>
                    </div>
                    <div className={styles.right}>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"name"}
                                className={"text-fg-disabled"}
                            >{edit ? "" : "Category"} Name (*)</label>
                            <input
                                id={"name"}
                                value={name}
                                onChange={(e) => handleNameInput(e)}
                                type="text"
                                className={"input inputWithoutWidth"}
                                placeholder={"Generate a name for the category"}
                            />
                        </div>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"desc"}
                                className={"text-fg-disabled"}
                            >Description (Optional)</label>
                            <textarea
                                rows={6}
                                id={"desc"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={"input inputWithoutWidth textAreaInput"}
                                placeholder={"Generate a description about the category"}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.left}></div>
                    <div className={styles.right}>
                        <div
                            onClick={() => setIsDifficult(!isDifficult)}
                            className={styles.checkboxWrapper}
                        >
                            {
                                isDifficult
                                    ? <div className={styles.checked}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g id="check">
                                                <path id="Icon" d="M11.6668 3.5L5.25016 9.91667L2.3335 7" stroke="white"
                                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    : <div className={styles.checkbox}></div>
                            }
                            <span
                                className={"text-fg-disabled"}
                            >Assembly Required</span>
                        </div>
                    </div>
                </div>
                {
                    edit && <div className={styles.informationDelete}>
                        <div className={styles.left}>
                            <span className={"text-utility-gray-700"}>Category deletion</span>
                            <span className={"text-14_faux text-tertiary"}>
                                Clicking &apos;Delete Category&apos; will permanently remove this category,
                                automatically be detached from its subcategories.
                            </span>
                        </div>
                        <button
                            onClick={handleDeleteCategory}
                            className={"btnDelete"}
                        >
                            Delete this category
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

export default Add;
