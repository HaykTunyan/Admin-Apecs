import React from "react";
import styles from "@/styles/categories.module.scss";
import {useRouter} from "next/navigation";

interface IEmptyNotice {
    type: string;
    link: string;
    openModal?: (x: boolean) => void;
}

const EmptyNotice = ({type, link, openModal}: IEmptyNotice) => {
    const router = useRouter();

    const handleAction = () => {
        if (openModal) {
            openModal(true);
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
            return;
        }

        router.push(link);
    };

    return (
        <div className={styles.categoriesEmpty}>
            <div className={styles.emptyContainer}>
                <div className={styles.plusSquare}>
                    {
                        type === "value" ? <svg
                                className={styles.plusIcon}
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="plus">
                                    <path id="Icon" d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333" stroke="#201F27"
                                          strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                            : <svg
                                className={styles.plusIcon}
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-square">
                                    <path id="Icon"
                                          d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                                          stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                    }
                </div>
                <div
                    className={styles.texts}
                    style={type === "value" ? {marginBottom: "4px"} : undefined}
                >
                    {
                        type === "value"
                            ? <span className={"text-18_28_inter font-medium"}>No values found</span>
                            : type === "mainProducts" ?
                                <span className={"text-18_28_inter font-medium"}>No main products found</span>
                                : type === "productItems" ?
                                    <span className={"text-18_28_inter font-medium"}>No product items found</span>
                                    : type === "attributes"
                                        ? <span className={"text-18_28_inter font-medium"}>No attributes found</span>
                                        : <span className={"text-18_28_inter font-medium"}>No {type} are available</span>
                    }
                    {
                        type === "categories" && <span className={"text-14_faux text-tertiary"}>
                            Start by adding new {type} to organize your products.
                        </span>
                    }
                    {
                        type === "subcategories" && <span className={"text-14_faux text-tertiary"}>
                        Start by adding new {type} to attach your categories and organize your products.
                        </span>
                    }
                    {
                        type === "attributes" && <span className={"text-14_faux text-tertiary"}>
                        Start by adding attributes to categorize your products with specific values.
                        </span>
                    }
                    {
                        type === "value" && <span className={"text-14_faux text-tertiary"}>
                        Start by adding values to this attribute. You can add several types of values to each attribute
                        </span>
                    }
                    {
                        type === "mainProducts" && <span className={"text-14_faux text-tertiary"}>
                        Main product list is currently empty.  Click the &quot;Add a main product&quot; button to start building your catalog.
                        </span>
                    }
                    {
                        type === "productItems" && <span className={"text-14_faux text-tertiary"}>
                        Product items list is currently empty.  Click the &quot;Add a product item&quot; button to start building your catalog.
                        </span>
                    }
                </div>
                <button
                    className={"btnPrim"}
                    style={{height: "44px"}}
                    onClick={handleAction}
                >
                    <svg
                        className={"btnIcon"}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus">
                            <path id="Icon" d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333" stroke="#201F27"
                                  strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <span>
                        Add {type === "attributes" ? "an" : "a"} {
                        type === "categories" && <span>category</span>
                    }
                        {
                            type === "subcategories" && <span>subcategory</span>
                        }
                        {
                            type === "attributes" && <span>attribute</span>
                        }
                        {
                            type === "value" && <span>value</span>
                        }
                        {
                            type === "mainProducts" && <span>main product</span>
                        }
                        {
                            type === "productItems" && <span>product item</span>
                        }
                    </span>
                </button>
                <img
                    className={styles.squares}
                    src="/icons/product/squares.svg"
                    alt="squares"
                />
            </div>
        </div>
    );
};

export default EmptyNotice;
