"use client";

import React, {useEffect, useState} from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import DropDownMainProduct from "@/containers/productManagement/list/productItems/dropDownMainProduct";
import {ImageFile, IVersion, MainProduct, ProductItem} from "@/utils/types";
import {getMainProducts} from "@/api/productManagement/mainProduct/getMainProducts";
import {getMainProduct} from "@/api/productManagement/mainProduct/getMainProduct";
import {Collapse} from "react-collapse";
import UploadImageMultiple from "@/containers/productManagement/uploadImageMultiple";
import {createProductItem} from "@/api/productManagement/productItem/createProductItem";
import Values from "@/containers/productManagement/list/productItems/values";
import {IValue} from "@/containers/productManagement/attributes/addAttr";
import Versions from "@/containers/productManagement/list/productItems/versions";
import {updateProductItem} from "@/api/productManagement/productItem/updateProductItem";
import DeleteModal from "@/containers/productManagement/categories/deleteModal";
import DropDownComponents from "@/containers/productManagement/dropDownComponents";
import {getComponentAPI} from "@/service/product-management/component-api/getComponent";

export interface IRoute {
    name: string;
    link: string;
}

interface IAdd {
    edit: boolean;
    currentProductItem: ProductItem;
}

export interface IComponent {
    id: string;
    name: string;
}

const AddProductItem = ({edit, currentProductItem}: IAdd) => {
    const router = useRouter();
    const [isDeleteRequested, setIsDeleteRequested] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [mainProducts, setMainProducts] = useState<MainProduct[]>([]);
    const [selectedMainProduct, setSelectedMainProduct] = useState<MainProduct | null>(null);

    const [currentAttributes, setCurrentAttributes] = useState<any>([]);
    const [currentVersions, setCurrentVersions] = useState<IVersion[]>(currentProductItem?.versions ? currentProductItem.versions : []);
    const [sku, setSku] = useState<string>(currentProductItem?.sku ? currentProductItem.sku : "");
    // const [price, setPrice] = useState<string>(currentProductItem?.price ? currentProductItem.price : "");
    // const [isPublished, setIsPublished] = useState<boolean>(currentProductItem?.is_published ? currentProductItem.is_published : false);
    const [commodity, setCommodity] = useState<string>(currentProductItem?.commodity_code ? currentProductItem.commodity_code : "");
    const [images, setImages] = useState<File[]>([]);
    const [initialImages, setInitialImages] = useState<ImageFile[]>(currentProductItem?.media.length > 0 ? currentProductItem.media : []);
    const [selectedValues, setSelectedValues] = useState<any>(currentProductItem?.attributeValues ? currentProductItem.attributeValues : []);
    const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<IComponent>(currentProductItem.components.length ? currentProductItem.components[0] : {id: "", name: ""});
    const [components, setComponents] = useState<IComponent[]>([]);
    const noImage = images.length === 0 && initialImages.length === 0;
    // Missing => price dependency
    const disabledFromVersions = !currentVersions.every(
        (version) => version.barcode && version.priority && version.version
    );
    const disabledDraft = !selectedMainProduct?.id || isProcessing || disabledFromVersions;
    const disabledPublish = !selectedMainProduct?.id || currentVersions.length === 0 || noImage || isProcessing || !selectedMainProduct.is_active || disabledFromVersions;

    const routes = [
        {
            name: "Products",
            link: "/product-management/list?itemType=productItems",
        },
        {
            name: `${edit ? "Edit" : "Add a"} product item`,
            link: "",
        },
    ];

    const handleDeleteProductItem = () => {
        setIsDeleteRequested(true);
    };

    useEffect(() => {
        if (isDeleteRequested) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isDeleteRequested]);

    const handleSubmit = (publish: string) => {
        setIsProcessing(true);

        if (edit) {
            updateProductItem(
                currentProductItem.id,
                commodity,
                "",
                publish === "publish",
                selectedValues
                    .filter((item: IValue) => item !== undefined)
                    .map((item: IValue) => item.id),
                selectedComponent ? [selectedComponent.id] : [],
                currentVersions.map(({item_id, inventory, ...rest}) => rest),
                images,
                deletedImageIds,
            )
                .then(() => {
                    setIsProcessing(false);
                    window.location.reload();
                })
                .catch(() => setIsProcessing(false));
        } else if (selectedMainProduct?.id) {
            createProductItem(
                selectedMainProduct.id,
                commodity,
                "",
                publish === "publish",
                selectedValues
                    .filter((item: IValue) => item !== undefined)
                    .map((item: IValue) => item.id),
                selectedComponent ? [selectedComponent.id] : [],
                currentVersions.map(({item_id, inventory, ...rest}) => rest),
                images,
            )
                .then(() => {
                    setIsProcessing(false);
                    router.push("/product-management/list?itemType=productItems");
                })
                .catch(() => setIsProcessing(false));
        }
    };

    useEffect(() => {
        getMainProducts(50, 0)
            .then(res => {
                if (res) {
                    setMainProducts(res.rows);
                }
            });
    }, []);

    useEffect(() => {
        getComponentAPI({
            params: {
                offset: "",
                limit: "",
                orderBy: "",
                sort: "",
                q: "",
            },
        })
            .then(res => {
                if (res) {
                    const currentComponents = res.rows.map((i: any) => {
                        return {
                            id: i.id,
                            name: i.name,
                        };
                    });
                    setComponents(currentComponents);
                }
            });
    }, []);

    const handleSelectMainProduct = (x: MainProduct) => {
        setSelectedMainProduct(x);
    };

    useEffect(() => {
        if (selectedMainProduct) {
            getMainProduct(selectedMainProduct.id).then((res) => {
                const newAttributes = res.category.attributes;
                setCurrentAttributes(newAttributes);

                const updatedValues = newAttributes.map((attribute: any) => {
                    const matchingValue = currentProductItem?.attributeValues?.find(
                        (value: any) => value.attribute?.id === attribute.id
                    );

                    return matchingValue || null;
                }).filter((value) => value !== null);

                setSelectedValues(updatedValues);
            });
        } else if (currentProductItem?.product?.id) {
            getMainProduct(currentProductItem.product.id).then((res) => {
                setSelectedMainProduct(res);
                setCurrentAttributes(res.category.attributes);
            });
        }
    }, [selectedMainProduct, currentProductItem?.product?.id]);

    const handleSetImages = (newImages: File[]) => {
        setImages(newImages);
    };

    const handleAddVersion = (x: IVersion[]) => {
        setCurrentVersions(x);
    };

    const handleSelectValues = (x: any) => {
        setSelectedValues(x);
    };

    const handleCollectDeleteIds = (deleteId: string) => {
        setDeletedImageIds(prev => [...prev, deleteId]);
    };

    const handleSelectComponent = (x: IComponent) => {
        setSelectedComponent(x);
    };

    return (
        <div className={styles.addContainer}>
            {
                isDeleteRequested && <DeleteModal
                    api={"product-items"}
                    otherPage={true}
                    id={currentProductItem.id}
                    type={"productItem"}
                    name={`SKU ${currentProductItem.sku}`}
                    setIsDeleteRequested={setIsDeleteRequested}
                />
            }
            <div className={styles.addContainerTopProductItem}>
                <Route
                    routes={routes}
                />
                <div className={styles.productItemContainer}>
                    <div className={styles.addTop}>
                        <span className={"text-32_n"}>{edit ? "Edit the" : "Add a"} product item</span>
                        <div className={styles.actionBtns}>
                            <button
                                onClick={() => router.back()}
                                className={"btnSec"}
                            >
                                <span>Back</span>
                            </button>
                            <button
                                onClick={() => handleSubmit("draft")}
                                disabled={disabledDraft}
                                className={"btnPrim btnDraft"}
                            >
                                <span>Save as draft</span>
                            </button>
                            <button
                                className={"btnPrim"}
                                disabled={disabledPublish}
                                onClick={() => handleSubmit("publish")}
                            >
                                <span>Save and publish</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.informationProductItems}>
                        <div className={styles.grid}>
                            <div className={"inputWithLabel"}>
                                <label
                                    className={"text-fg-disabled"}
                                >Main product (*)</label>
                                {
                                    edit
                                        ? <input
                                            id={"sku"}
                                            value={selectedMainProduct?.name}
                                            type="text"
                                            disabled={true}
                                            className={"input inputWithoutWidth"}
                                            style={{color: "#667085"}}
                                            placeholder={""}
                                        />
                                        : <DropDownMainProduct
                                            onSelect={handleSelectMainProduct}
                                            mainProducts={mainProducts}
                                            selectedMainProduct={selectedMainProduct}
                                        />
                                }
                                <span className={"text-14_faux text-tertiary"}>
                                    Select the main product
                                </span>
                            </div>
                            {
                                edit && selectedMainProduct?.name &&
                                <div className={"inputWithLabel"}>
                                    <label
                                        className={`text-fg-disabled ${styles.hiddenText}`}
                                    >Main product (*)</label>
                                    <div className={styles.selectedMainProduct}>
                                        <span className={"text-18_28_inter text-default-primary"}>
                                            {selectedMainProduct?.name}
                                        </span>
                                        <div className={styles.subAndCat}>
                                            <span className={"text-14_faux text-tertiary"}>
                                                {selectedMainProduct?.category.name} &gt;  {selectedMainProduct?.subCategory.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {
                            !edit &&
                            <span className={"text-14_faux text-tertiary"}>
                                The system automatically generates an SKU code each time you click the &quot;Add Product Item&quot; button.
                            </span>
                        }
                        <div className={styles.grid}>
                            <div className={"inputWithLabel"}>
                                <label
                                    htmlFor={"sku"}
                                    className={"text-fg-disabled"}
                                >Product item SKU (*)</label>
                                <div className={styles.SKUContainer}>
                                    <div className={styles.SKUTitle}>
                                        <span className={"text-16_24_inter text-tertiary"}>
                                            SKU
                                        </span>
                                    </div>
                                    <input
                                        id={"sku"}
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        type="text"
                                        disabled={true}
                                        className={"input inputWithoutWidth inputSKU"}
                                        style={{color: "#667085"}}
                                        placeholder={""}
                                    />
                                </div>
                            </div>
                            <div className={"inputWithLabel"}>
                                <label
                                    htmlFor={"commodity"}
                                    className={"text-fg-disabled"}
                                >Commodity code (optional)</label>
                                <input
                                    id={"commodity"}
                                    value={commodity}
                                    onChange={(e) => setCommodity(e.target.value)}
                                    type="text"
                                    className={"input inputWithoutWidth"}
                                    placeholder={"0"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Collapse isOpened={currentAttributes.length > 0}>
                    <Values
                        onSelect={handleSelectValues}
                        currentAttributes={currentAttributes}
                        selectedValues={selectedValues}
                        edit={edit}
                    />
                </Collapse>
                {
                    components.length > 0 &&
                    <div className={styles.informationProductItems}>
                        <div className={styles.grid}>
                            <div className={"inputWithLabel"}>
                                <label
                                    htmlFor={"commodity"}
                                    className={"text-fg-disabled"}
                                >Component (*)</label>
                                <DropDownComponents
                                    components={components}
                                    selectedComponent={selectedComponent}
                                    onSelect={handleSelectComponent}
                                />
                            </div>
                        </div>
                    </div>
                }
                <div className={styles.multipleWrapper}>
                    <span className={"text-14_faux text-tertiary"}>
                        Upload high-quality images and videos of your product here. Ensure they clearly showcase the product from multiple angles.
                    </span>
                    <UploadImageMultiple
                        width={800}
                        height={400}
                        initialImages={initialImages}
                        setImage={handleSetImages}
                        onChange={setInitialImages}
                        onDelete={handleCollectDeleteIds}
                        images={images}
                    />
                </div>
                <Versions currentVersions={currentVersions} onUpdate={handleAddVersion}/>
            </div>
            {
                edit && <div className={styles.mainProductDelete}>
                    <div className={styles.mainProductTexts}>
                        <span className={"text-utility-gray-700"}>Product item deletion</span>
                        <span className={"text-14_faux text-tertiary"}>
                        Clicking &apos;Delete Product item&apos; will permanently remove the product item, including
                        all associated information and versions, from the catalog.
                    </span>
                    </div>
                    <button
                        onClick={handleDeleteProductItem}
                        className={"btnDelete"}
                    >
                        Delete this product item
                    </button>
                </div>
            }
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
                        disabled={disabledDraft}
                        onClick={() => handleSubmit("draft")}
                        className={"btnPrim btnDraft"}
                    >
                        <span>Save as draft</span>
                    </button>
                    <button
                        className={"btnPrim"}
                        disabled={disabledPublish}
                        onClick={() => handleSubmit("publish")}
                    >
                        <span>Save and publish</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductItem;
