"use client";

import React, {useEffect, useState} from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import DeleteModal from "@/containers/productManagement/categories/deleteModal";
import {ICategory} from "@/containers/productManagement/dropDown";
import {getCategories} from "@/api/productManagement/categories/getCategories";
import {AttributeSingle} from "@/utils/types";
import ValuesTable from "@/containers/productManagement/attributes/valuesTable";
import {generateUUID} from "@/hooks/generateUUID";
import DropDownMultiple from "@/containers/productManagement/attributes/dropDownMultiple";
import {createAttribute} from "@/api/productManagement/attributes/createAttribute";
import {updateAttribute} from "@/api/productManagement/attributes/updateAttribute";
import DropDownTags from "@/containers/productManagement/dropDownTags";
import {showToast} from "@/store/slices/toastSlice";
import {useDispatch} from "react-redux";

export interface IRoute {
    name: string;
    link: string;
}

interface IAdd {
    edit: boolean;
    currentAttribute: AttributeSingle;
}

export interface IValue {
    value: string,
    id: string,
    newValue?: boolean
}

const tags: string[] = [
    "Finish", "Mechanism Type", "Internal side A", "External side B", "Cylinder variation", "Key count"
];

const tagEnums: { [key: string]: string } = {
    "Finish": "FINISH_TYPE",
    "Mechanism Type": "MECHANISM_TYPE",
    "Internal side A": "INTERNAL_SIDE_SIZE",
    "External side B": "EXTERNAL_SIDE_SIZE",
    "Cylinder variation": "CYLINDER_VARIATION",
    "Key count": "KEY_COUNT"
};

const reverseTagEnums: { [key: string]: string } = Object.entries(tagEnums).reduce(
    (acc, [key, value]) => {
        acc[value] = key;
        return acc;
    },
    {} as { [key: string]: string }
);

const AddAttr = ({edit, currentAttribute}: IAdd) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [name, setName] = useState<string>(edit ? currentAttribute.name : "");
    const [isDeleteRequested, setIsDeleteRequested] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>(currentAttribute.categories.length > 0 ? currentAttribute.categories : []);
    const [currentValues, setCurrentValues] = useState<IValue[]>(currentAttribute.values.length > 0 ? currentAttribute.values : []);
    const [description, setDescription] = useState<string>(
        edit && currentAttribute.description ? currentAttribute.description : ""
    );
    const [selectedTag, setSelectedTag] = useState<string>(currentAttribute.type ? reverseTagEnums[currentAttribute.type] : "");

    const routes = [
        {
            name: "Product Management Settings",
            link: "/product-management/settings?filter=attributes",
        },
        {
            name: `${edit ? "Edit" : "Add an"} attribute`,
            link: "",
        },
    ];

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.rows));
    }, []);

    const disabled = !name || !description || isProcessing || selectedCategories.length === 0 || currentValues.length === 0 || !selectedTag;

    const handleDeleteCategory = () => {
        setIsDeleteRequested(true);
    };

    // const handleOpenToast = (type: string, title: string, text: string) => {
    //     setToast(true);
    //     setToastMsg(title);
    //     setToastTitle(text);
    //     setToastType(type);
    // };

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
            updateAttribute(currentAttribute.id, name, currentValues, selectedCategories, description, tagEnums[selectedTag])
                .then((res) => {
                    if (res.message === "Attribute with same type already exists") {
                        dispatch(showToast({
                            title: "Failed to add/edit the attribute",
                            message: res.message,
                            type: "error"
                        }));
                        setIsProcessing(false);
                        return;
                    }

                    setIsProcessing(false);
                    window.location.reload();
                })
                .catch(() => setIsProcessing(false));
        } else {
            createAttribute(name, currentValues, selectedCategories, description, tagEnums[selectedTag])
                .then((res) => {
                    if (res.message === "Attribute with same type already exists") {
                        dispatch(showToast({
                            title: "Failed to add/edit the attribute",
                            message: res.message,
                            type: "error"
                        }));
                        setIsProcessing(false);
                        return;
                    }
                    setIsProcessing(false);
                    router.push("/product-management/settings?filter=attributes");
                })
                .catch(() => setIsProcessing(false));
        }
    };

    const handleAddValue = (newValue: string) => {
        setCurrentValues(prev => [...prev, {value: newValue, id: generateUUID(), newValue: true}]);
    };

    const handleDeleteValue = (x: IValue) => {
        const updatedValues = currentValues.filter((item) => item.id !== x.id);

        setCurrentValues(updatedValues);
    };

    const handleEditValue = (x: IValue) => {
        setCurrentValues((prevValues) =>
            prevValues.map((item) =>
                item.id === x.id ? x : item
            )
        );
    };

    const handleAddCategory = (x: ICategory) => {
        setSelectedCategories((prev) => {
            const exists = prev.some((item) => item.id === x.id);

            return exists ? prev : [...prev, x];
        });
    };

    const handleRemoveCategory = (x: ICategory) => {
        setSelectedCategories(prev => prev.filter((item) => item.id !== x.id));
    };

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentName = e.currentTarget.value.trimStart();
        setName(currentName);
    };

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentName = e.currentTarget.value.trimStart();
        setDescription(currentName);
    };

    return (
        <div className={styles.addContainer}>
            {
                isDeleteRequested && <DeleteModal
                    id={currentAttribute.id}
                    otherPage={true}
                    type={"attribute"}
                    api={"attributes"}
                    name={currentAttribute.name}
                    setIsDeleteRequested={setIsDeleteRequested}
                />
            }
            <div className={styles.addContainerTop}>
                <Route
                    routes={routes}
                />
                <div className={styles.addTop}>
                    <span className={"text-32_n"}>{edit ? "Edit the" : "Add an"} attribute</span>
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
                        <span className={"text-16_20 font-medium text-utility-gray-700"}>Basic information</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Name the attribute
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
                                placeholder={"Enter a name for the attribute"}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCategory}>
                    <div className={styles.left}>
                        <span className={"text-16_20 font-medium text-utility-gray-700"}>Basic information</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Name the attribute
                        </span>
                    </div>
                    <div className={styles.right}>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"name"}
                                className={"text-fg-disabled"}
                            >Attribute Tags (*)</label>
                            <DropDownTags
                                tags={tags}
                                selectedTag={selectedTag}
                                onSelect={setSelectedTag}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCategory}>
                    <div className={styles.left}>
                        <span className={"text-16_20 font-medium text-utility-gray-700"}>Categories</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Attach categories that the attribute will be associated with. Once set, users can
                            link these attributes to products within the selected categories.
                        </span>
                    </div>
                    <div className={styles.right}>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"name"}
                                className={"text-fg-disabled"}
                            >Select categories (*)</label>
                            <DropDownMultiple
                                onAdd={handleAddCategory}
                                onRemove={handleRemoveCategory}
                                categories={categories}
                                selectedCategories={selectedCategories}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCategory}>
                    <div className={styles.left}>
                        <span className={"text-16_20 font-medium text-utility-gray-700"}>Short description</span>
                        <span className={"text-14_faux text-tertiary"}>
                            Concise description of the product
                        </span>
                    </div>
                    <div className={styles.right}>
                        <div className={"inputWithLabel"}>
                            <label
                                htmlFor={"shortDesc"}
                                className={"text-fg-disabled"}
                            >Description (*)</label>
                            <textarea
                                id={"shortDesc"}
                                rows={5}
                                value={description}
                                onChange={(e) => handleDescription(e)}
                                className={"input inputWithoutWidth textAreaInput"}
                                placeholder={"Enter a description for the attribute"}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCategory}>
                    <ValuesTable
                        currentValues={currentValues}
                        handleAddANewValue={handleAddValue}
                        handleDeleteValue={handleDeleteValue}
                        handleEditValue={handleEditValue}
                    />
                </div>
                {
                    edit && <div className={styles.informationDelete}>
                        <div className={styles.left}>
                            <span className={"text-utility-gray-700"}>Attribute deletion</span>
                            <span className={"text-14_faux text-tertiary"}>
                                Clicking &apos;Delete Attribute&apos; will permanently remove this product
                                attribute and all its associated values.
                            </span>
                        </div>
                        <button
                            onClick={handleDeleteCategory}
                            className={"btnDelete"}
                        >
                            Delete this attribute
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

export default AddAttr;
