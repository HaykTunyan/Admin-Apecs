import React, {useEffect, useState} from "react";
import styles from "@/styles/categories.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {GetProductItemsResponse} from "@/utils/types";
import TableHeaderProductItems from "@/containers/productManagement/list/productItems/productItemsTable/tableHeader";
import TableRowProductItem from "@/containers/productManagement/list/productItems/productItemsTable/tableRow";
import ProductItemTableSearch
    from "@/containers/productManagement/list/productItems/productItemsTable/productItemTableSearch";
import TablePagination from "@/containers/productManagement/tablePagination";
import EmptyNoticeFilters from "@/containers/productManagement/emptyNoticeFilters";
import FilterTabsProductItem from "@/containers/productManagement/list/filterTabsProductItem";

interface ICategoriesTable {
    products: GetProductItemsResponse;
    searchValue: string;
    filtered?: boolean;
}

const ProductItemsTable = ({products, searchValue, filtered}: ICategoriesTable) => {
    const [productsIdsToPublish, setProductsIdsToPublish] = useState<string[]>([]);

    const productsWithActiveMain = products.rows
        .filter(i => i.product.is_active)
        .map(i => i.id);

    const decodedToken = useSelector(
        (state: RootState) => state.token.decodedToken
    );

    useEffect(() => {
        setProductsIdsToPublish([]);
    }, [products]);

    const accessPermissions = decodedToken?.permissions;

    const handleSelectAll = (x: boolean) => {
        if (x) {
            const itemsToPublish = products.rows
                .filter((i) => !i.is_published)
                .filter(i => productsWithActiveMain.includes(i.id));
            const toPublishIds = itemsToPublish.map(i => i.id);

            setProductsIdsToPublish(toPublishIds);
        } else {
            setProductsIdsToPublish([]);
        }
    };

    const handleToggleSingle = (id: string) => {
        const alreadySelected = productsIdsToPublish.includes(id);

        if (alreadySelected) {
            const updatedProducts = productsIdsToPublish.filter(i => i !== id);
            setProductsIdsToPublish(updatedProducts);
        } else {
            setProductsIdsToPublish(prev => [...prev, id]);
        }
    };

    // console.log(products);
    //
    // const handlePublishSelected = () => {
    //
    // };

    return (
        <div className={styles.tableContainer}>
            <ProductItemTableSearch
                searchValue={searchValue}
                type={"productItem"}
                title={"Product Items"}
                permission={accessPermissions}
                productsIdsToPublish={productsIdsToPublish}
            />
            <FilterTabsProductItem/>
            <TableHeaderProductItems
                onSelectAll={handleSelectAll}
                productsIdsToPublish={productsIdsToPublish}
                productsWithActiveMain={productsWithActiveMain}
                products={products}
            />
            {
                filtered && products.count === 0 &&
                <EmptyNoticeFilters type={"productItems"}/>
            }
            {
                products.rows.map((c, index) =>
                    <TableRowProductItem
                        key={index}
                        id={c.id}
                        sku={c.sku}
                        color={index % 2 === 0 ? "#F9FAFB" : "#FFFFFF"}
                        mainProduct={c.product.name}
                        mainProductStatus={c.product.is_active}
                        status={c.is_published}
                        attributeValues={c.attributeValues}
                        permision={accessPermissions}
                        productsIdsToPublish={productsIdsToPublish}
                        onSelect={handleToggleSingle}
                    />
                )
            }
            {
                filtered && products.count === 0
                    ? <div></div>
                    : <TablePagination count={products.count}/>
            }
        </div>
    );
};

export default ProductItemsTable;
