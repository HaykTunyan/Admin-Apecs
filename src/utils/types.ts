export interface Attribute {
    id: string;
    name: string;

}

export interface CategoryLess {
    id: string;
    name: string;
    description: string;
}

export interface ImageFile {
    id: string;
    src: string;
    mimeType: string;
}

export interface SubCategory {
    id: string;
    name: string;
    description: string;
    category: CategoryLess;
    image: ImageFile | null;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    assembly_required: boolean,
    subCategories: SubCategory[];
    attributes: Attribute[];
}

export interface GetCategoriesResponse {
    count: number;
    rows: Category[];
}

export interface GetSubCategoriesResponse {
    count: number;
    rows: SubCategory[];
}

export interface ITab {
    name: string;
    value: string;
    quantity: number;
}

interface Value {
    id: string;
    value: string;
}

interface CategoryAttr {
    id: string;
    name: string;
}

export interface AttributeSingle {
    id: string;
    name: string;
    values: Value[];
    categories: CategoryAttr[];
    description: string;
    type: string;
}

export interface AttributeCategory {
    id: string;
    attributeId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface CategoryAttributes {
    id: string;
    name: string;
    description: string;
    AttributeCategory: AttributeCategory;
}

interface AttributeRow {
    id: string;
    name: string;
    type: string;
    categories: CategoryAttributes[];
}

export interface GetAttributesResponse {
    count: number;
    rows: AttributeRow[];
}

// product list

export interface MainProduct {
    "id": string,
    "name": string,
    "short_description": string,
    "long_description": string,
    "meta_title": string,
    "meta_description": string,
    "is_active": boolean,
    "category": Category
    "subCategory": Attribute
}

export interface GetMainProductsResponse {
    count: number;
    rows: MainProduct[];
}

interface Product {
    id: string;
    name: string;
    short_description: string;
    long_description: string;
    meta_title: string;
    meta_description: string;
    is_active: boolean;
    category: CategoryLess;
    subCategory: CategoryLess;
}

interface AttributeValue {
    id: string;
    value: string;
    attribute: Attribute;
}

// interface ComponentImage {
//     id: string;
//     src: string;
// }

// interface Component {
//     id: string;
//     category: Category;
//     image: ComponentImage;
// }

export interface ProductItem {
    commodity_code: string,
    id: string;
    is_published: boolean;
    price: string,
    product: Product;
    sku: string,
    versions: IVersion[];
    attributeValues: AttributeValue[];
    media: ImageFile[],
    components: any,
}

export interface GetProductItemsResponse {
    count: number;
    rows: ProductItem[];
}

export interface IVersion {
    id: string,
    version: string,
    barcode: string,
    priority: number | null,
    // customerAvailability: string,
    comment: string
    item_id?: string,
    inventory?: string
}

export interface ICategoryFilter {
    id: string;
    name: string;
}
