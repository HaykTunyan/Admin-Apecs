import React, {ChangeEvent} from "react";
import styles from "@/styles/add.module.scss";
import DropDown, {ICategory} from "@/containers/productManagement/dropDown";
import Knob from "@/containers/productManagement/list/knob";

interface ProductInfo {
    categories: any;
    subCategories: any;
    selectedCategory: ICategory;
    selectedSubCategory: ICategory;
    setSelectedCategory: (selectedCategory: ICategory) => void;
    setSelectedSubCategory: (selectedSubCategory: ICategory) => void;
    edit: boolean;
    productName: string;
    setProductName: (e: ChangeEvent<HTMLInputElement>) => void;
    shortDescription: string;
    setShortDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    longDescription: string;
    setLongDescription: (shortDescription: string) => void;
    metaTitle: string;
    metaDesc: string;
    setMetaTitle: (title: string) => void;
    setMetaDesc: (desc: string) => void;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

const ProductInfo = ({
                         categories,
                         subCategories,
                         setSelectedCategory,
                         selectedCategory,
                         edit,
                         setProductName,
                         productName,
                         shortDescription,
                         setLongDescription,
                         setShortDescription,
                         longDescription,
                         metaTitle,
                         setMetaTitle,
                         metaDesc,
                         setMetaDesc,
                         isActive,
                         setIsActive,
                         setSelectedSubCategory,
                         selectedSubCategory
                     }: ProductInfo) => {
    return (
        <div className={styles.productInfoTable}>
            <div className={styles.tableHeader}>
                {
                    edit
                        ? <div className={styles.mainProductTitle}>
                            <span className={"text-18_28_inter text-default-primary"}>{productName}</span>
                            <span
                                className={"text-14_faux text-tertiary"}>{selectedCategory.name} &gt; {selectedSubCategory.name}</span>
                        </div>
                        : <span className={"text-18_28_inter text-default-primary"}>Product</span>
                }
            </div>
            <div className={styles.mainInfo}>
                <div className={styles.categoriesAndSub}>
                    <div className={styles.labelContainer}>
                        <span className={"text-16_20 text-fg-disabled"}>Category (*)</span>
                        <DropDown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                    <div className={styles.labelContainer}>
                        <span className={"text-16_20 text-fg-disabled"}>Subcategory (*)</span>
                        <DropDown
                            categories={subCategories}
                            selectedCategory={selectedSubCategory}
                            setSelectedCategory={setSelectedSubCategory}
                        />
                    </div>
                    <span className={"text-14_faux text-tertiary"}>
                        Generate a name and description for your product.
                    </span>
                </div>
                <div className={"inputWithLabel"}>
                    <label
                        htmlFor={"name"}
                        className={"text-fg-disabled"}
                    >Product Name (*)</label>
                    <input
                        id={"name"}
                        value={productName}
                        onChange={(e) => setProductName(e)}
                        type="text"
                        className={"input inputWithoutWidth"}
                        placeholder={"Add a name and description for your product."}
                    />
                </div>
                <div className={styles.categoriesAndSub}>
                    <div className={"inputWithLabel"}>
                        <label
                            htmlFor={"shortDesc"}
                            className={"text-fg-disabled"}
                        >Short description (*)</label>
                        <textarea
                            id={"shortDesc"}
                            rows={5}
                            maxLength={255}
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e)}
                            className={"input inputWithoutWidth textAreaInput"}
                            placeholder={"Concise description of the product"}
                        />
                    </div>
                    <div className={"inputWithLabel"}>
                        <label
                            htmlFor={"longDesc"}
                            className={"text-fg-disabled"}
                        >Long description (optional)</label>
                        <textarea
                            id={"longDesc"}
                            rows={5}
                            value={longDescription}
                            onChange={(e) => setLongDescription(e.target.value)}
                            className={"input inputWithoutWidth textAreaInput"}
                            placeholder={"Detailed description of the product"}
                        />
                    </div>
                </div>
                <span className={"text-14_faux text-tertiary"}>
                        Optimize your product&apos;s online presence by adding a compelling meta title and description.
                    </span>
                <div className={"inputWithLabel"}>
                    <label
                        htmlFor={"metaTitle"}
                        className={"text-fg-disabled"}
                    >Meta title (optional)</label>
                    <input
                        id={"metaTitle"}
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        type="text"
                        className={"input inputWithoutWidth"}
                        placeholder={"Enter a concise, keyword-rich title for your product"}
                    />
                    <span className={"text-14_faux text-tertiary"}>
                        Enter a concise, keyword-rich title for your product
                    </span>
                </div>
                <div className={"inputWithLabel"}>
                    <label
                        htmlFor={"metaDesc"}
                        className={"text-fg-disabled"}
                    >Meta description (optional)</label>
                    <textarea
                        id={"metaDesc"}
                        rows={5}
                        value={metaDesc}
                        onChange={(e) => setMetaDesc(e.target.value)}
                        className={"input inputWithoutWidth textAreaInput"}
                        placeholder={"Provide a brief description of your product, including key features and benefits"}
                    />
                    <span className={"text-14_faux text-tertiary"}>
                        Provide a brief description of your product, including key features and benefits
                    </span>
                </div>
                <div className={styles.knobWrapper}>
                    <span className={"text-14_faux text-tertiary"}>
                        Choose whether the product is visible to customers on the website.
                    </span>
                    <Knob
                        name={"Active"}
                        setIsActive={setIsActive}
                        isActive={isActive}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
