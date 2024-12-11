"use client";

import React, {useState} from "react";
import Route from "@/containers/productManagement/categories/route";
import styles from "@/styles/add.module.scss";
import {useRouter} from "next/navigation";
import {ProductItem} from "@/utils/types";
import ImageModal from "@/containers/productManagement/imageModal";

export interface IRoute {
    name: string;
    link: string;
}

interface IAdd {
    currentProductItem: ProductItem;
}

const PreviewProductItem = ({currentProductItem}: IAdd) => {
    const router = useRouter();
    const [isImageClicked, setIsImageClicked] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string>("");

    const routes = [
        {
            name: "Products",
            link: "/product-management/list?itemType=productItems",
        },
        {
            name: `View the product item`,
            link: "",
        },
    ];

    const handleRedirectToEdit = () => {
        router.push(`/product-management/list/product-item/${currentProductItem.id}`);
    };

    const openImageModal = (url: string) => {
        setModalImage(url);
        setIsImageClicked(true);
    };

    return (
        <div className={styles.addContainer}>
            {isImageClicked && <ImageModal setIsImageClicked={setIsImageClicked} image={modalImage}/>}
            <div className={styles.addContainerTop}>
                <Route
                    routes={routes}
                />
                <div className={styles.addTop}>
                    <span className={"text-32_n"}>View the product item</span>
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
                            <span className={"text-16_20 text-grey-light-700"}>Product item</span>
                        </div>
                    </div>
                </div>
                <div className={styles.previewTable}>
                    <div className={styles.previewTitlesProductItem}>
                        <div className={styles.selectedProductItem}>
                            <div className={styles.previewImg}>
                                <img className={styles.img} src={currentProductItem.media[0].src} alt=""/>
                            </div>
                            <span className={"text-18_28_inter text-default-primary"}>
                                SKU: {currentProductItem?.sku}
                            </span>
                        </div>
                    </div>
                    <div className={styles.productItemDetailsWrapper}>
                        <div className={styles.productItemDetails}>
                            <div className={styles.previewInfoRowProduct}>
                                <span className={"text-16_20 text-grey-light-700 font-medium"}>Main product</span>
                                <span
                                    className={"text-16_24_inter text-tertiary"}>{currentProductItem.product.name}</span>
                            </div>
                            <div className={styles.previewInfoRowProduct}>
                                <span className={"text-16_20 text-grey-light-700 font-medium"}>Product SKU</span>
                                <span
                                    className={"text-16_24_inter text-tertiary"}>{currentProductItem.sku}</span>
                            </div>
                            <div className={styles.previewInfoRowProduct}>
                                <span className={"text-16_20 text-grey-light-700 font-medium"}>Commodity code</span>
                                <span
                                    className={"text-16_24_inter text-tertiary"}>{currentProductItem.commodity_code}</span>
                            </div>
                            <div className={styles.previewInfoRowProduct}>
                                <span className={"text-16_20 text-grey-light-700 font-medium"}>Retail price</span>
                                <span
                                    className={"text-16_24_inter text-tertiary"}>-</span>
                            </div>
                            <div className={styles.previewInfoRowProduct}>
                                <span className={"text-16_20 text-grey-light-700 font-medium"}>Component</span>
                                <span
                                    className={"text-16_24_inter text-tertiary"}>-</span>
                            </div>
                            <div className={styles.previewInfoRowProductLast}>
                                <span className={"text-16_20 text-grey-light-700 font-medium"}>Live status</span>
                                {
                                    currentProductItem.is_published
                                        ? <div className={styles.statusBadgeProduct}>
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g id="_Dot">
                                                    <circle id="Dot" cx="4" cy="4" r="3" fill="#17B26A"/>
                                                </g>
                                            </svg>
                                            <span className={"text-12_18 text-utility-success"}>Live on site</span>
                                        </div>
                                        : <div className={styles.inactiveBadgeProduct}>
                                            <span className={"text-12_18 text-warning"}>Draft</span>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className={styles.productItemDetails}>
                            {
                                currentProductItem.attributeValues.map((value, index) =>
                                    <div
                                        key={index}
                                        className={index === currentProductItem.attributeValues.length - 1 ? styles.previewInfoRowProductLast : styles.previewInfoRowProduct}>
                                        <span
                                            className={"text-16_20 text-grey-light-700 font-medium"}>{value.attribute.name}</span>
                                        <span
                                            className={"text-16_24_inter text-tertiary"}>{value.value}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.productItemDetails}>
                            {currentProductItem.media.length > 0 && (
                                <div className={styles.imagesWrapper}>
                                    {currentProductItem.media.map((image, idx) => (
                                        <div key={idx} className={styles.uploadedContainerMultiple}
                                             onClick={() => openImageModal(currentProductItem.media[idx].src)}
                                        >
                                            <div className={styles.imageWrapper}>
                                                <img className={styles.uploadImage} src={image.src}
                                                     alt={`Uploaded ${idx}`}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.productItemDetailsVersions}>
                            {
                                currentProductItem.versions.map((version, idx) =>
                                    <div key={idx} className={styles.versionWrapper}>
                                        <div className={styles.versionHeader}>
                                            <span className={"text-18_28_inter default-primary"}>
                                                Version {version.version}
                                            </span>
                                        </div>
                                        <div className={styles.previewInfoRowProduct}>
                                            <span
                                                className={"text-16_20 text-grey-light-700 font-medium"}>Version name</span>
                                            <span
                                                className={"text-16_24_inter text-tertiary"}>V {version.version}</span>
                                        </div>
                                        <div className={styles.previewInfoRowProduct}>
                                            <span
                                                className={"text-16_20 text-grey-light-700 font-medium"}>Barcode</span>
                                            <span
                                                className={"text-16_24_inter text-tertiary"}>{version.barcode}</span>
                                        </div>
                                        <div className={styles.previewInfoRowProduct}>
                                            <span
                                                className={"text-16_20 text-grey-light-700 font-medium"}>Priority</span>
                                            <span
                                                className={"text-16_24_inter text-tertiary"}>{version.priority}</span>
                                        </div>
                                        <div className={styles.previewInfoRowProduct}>
                                            <span
                                                className={"text-16_20 text-grey-light-700 font-medium"}>Customer availability</span>
                                            <span
                                                className={"text-16_24_inter text-tertiary"}>-</span>
                                        </div>
                                        <div className={styles.previewInfoRowProductLast}>
                                            <span
                                                className={"text-16_20 text-grey-light-700 font-medium"}>Comment</span>
                                            <span
                                                className={"text-16_24_inter text-tertiary"}>{version.comment}</span>
                                        </div>
                                    </div>
                                )
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

export default PreviewProductItem;
