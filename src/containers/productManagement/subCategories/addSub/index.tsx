"use client";

import React, {useEffect, useState} from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import DeleteModal from "@/containers/productManagement/categories/deleteModal";
import DropDown, {ICategory} from "@/containers/productManagement/dropDown";
import UploadImage from "@/containers/productManagement/uploadImage";
import {createSubcategory} from "@/api/productManagement/subcategories/createSubcategory";
import {getCategories} from "@/api/productManagement/categories/getCategories";
import {SubCategory} from "@/utils/types";
import {updateSubcategory} from "@/api/productManagement/subcategories/updateSubcategory";

interface IAdd {
    edit: boolean;
    currentSubcategory: SubCategory;
}

const AddSub = ({edit, currentSubcategory}: IAdd) => {
    const router = useRouter();
    const [name, setName] = useState<string>(currentSubcategory?.name ? currentSubcategory.name : "");
    const [description, setDescription] = useState<string>(currentSubcategory?.description ? currentSubcategory.description : "");
    const [isDeleteRequested, setIsDeleteRequested] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(currentSubcategory?.category ? currentSubcategory.category : {
        id: "",
        name: "",
    });
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const routes = [
        {
            name: "Product Management Settings",
            link: "/product-management/settings?filter=subcategories",
        },
        {
            name: `${edit ? "Edit" : "Add a"} subcategory`,
            link: "",
        },
    ];

    useEffect(() => {
        getCategories(50)
            .then((res) => setCategories(res.rows));
    }, []);

    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const oldImage = currentSubcategory?.image?.src ? currentSubcategory.image.src : "";

    const noImage = !categoryImage && !oldImage;

    const disabled = !name || noImage || !selectedCategory.id || isProcessing;

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
            updateSubcategory(currentSubcategory.id, name, description, selectedCategory.id, categoryImage)
                .then(() => {
                    setIsProcessing(false);
                    window.location.reload();
                })
                .catch(() => setIsProcessing(false));
        } else {
            createSubcategory(name, description, selectedCategory.id, categoryImage)
                .then(() => {
                    setIsProcessing(false);
                    router.push("/product-management/settings?filter=subcategories");
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
                    id={currentSubcategory.id}
                    otherPage={true}
                    type={"subcategory"}
                    api={"sub-categories"}
                    name={currentSubcategory.name}
                    setIsDeleteRequested={setIsDeleteRequested}
                />
            }
            <div className={styles.addContainerTop}>
                <Route
                    routes={routes}
                />
                <div className={styles.addTop}>
                    <span className={"text-32_n"}>{edit ? "Edit the" : "Add a"} subcategory</span>
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
                        <span className={"text-utility-gray-700"}>Sub-category information</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Basic information about the sub-category
                        </span>
                    </div>
                    <div className={styles.right}>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"name"}
                                className={"text-fg-disabled"}
                            >Name (*)</label>
                            <input
                                id={"name"}
                                value={name}
                                onChange={(e) => handleNameInput(e)}
                                type="text"
                                className={"input inputWithoutWidth"}
                                placeholder={"Generate a name for the subcategory"}
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
                                placeholder={"Generate a description about the sub-category"}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCategory}>
                    <div className={styles.left}>
                        <span className={"text-utility-gray-700"}>Category</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Attach a parent category to this subcategory to organize your products
                            effectively and ensure proper categorization.
                        </span>
                    </div>
                    <div className={styles.right}>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"name"}
                                className={"text-fg-disabled"}
                            >Select a category (*)</label>
                            <DropDown
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCategory}>
                    <div className={styles.left}>
                        <span className={"text-utility-gray-700"}>Image</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Import an image for this subcategory to visually represent
                            and enhance your product listings.
                        </span>
                    </div>
                    <div className={styles.rightUpload}>
                        <UploadImage
                            initialImage={oldImage || ""}
                            setImage={setCategoryImage}
                            width={800}
                            height={400}
                        />
                    </div>
                </div>
                {
                    edit && <div className={styles.informationDelete}>
                        <div className={styles.left}>
                            <span className={"text-utility-gray-700"}>Subcategory deletion</span>
                            <span className={"text-14_faux text-tertiary"}>
                                Clicking &apos;Delete Subcategory&apos; will permanently remove this subcategory
                                and automatically detach it from its parent category.
                            </span>
                        </div>
                        <button
                            onClick={handleDeleteCategory}
                            className={"btnDelete"}
                        >
                            Delete this subcategory
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

export default AddSub;
