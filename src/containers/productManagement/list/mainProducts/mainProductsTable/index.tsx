import React from "react";
import styles from "@/styles/categories.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {GetMainProductsResponse} from "@/utils/types";
import MainProductHeader from "@/containers/productManagement/list/mainProducts/mainProductsTable/mainProductHeader";
import TableRowMainProduct
    from "@/containers/productManagement/list/mainProducts/mainProductsTable/tableRowMainProduct";
import MainProductTableSearch
    from "@/containers/productManagement/list/mainProducts/mainProductsTable/mainProductTableSearch";
import TablePagination from "@/containers/productManagement/tablePagination";
import FilterTabs from "@/containers/productManagement/list/filterTabs";
import EmptyNoticeFilters from "@/containers/productManagement/emptyNoticeFilters";

interface ICategoriesTable {
    mainProducts: GetMainProductsResponse;
    searchValue: string;
}

const MainProductsTable = ({mainProducts, searchValue}: ICategoriesTable) => {
    const decodedToken = useSelector(
        (state: RootState) => state.token.decodedToken
    );

    const accessPermissions = decodedToken?.permissions;

    return (
        <div className={styles.tableContainer}>
            <MainProductTableSearch
                searchValue={searchValue}
                type={"mainProduct"}
                title={"Main Products"}
                permission={accessPermissions}
            />
            <FilterTabs/>
            {
                mainProducts.count > 0 &&
                <MainProductHeader/>
            }
            {
                mainProducts.count === 0 ?
                    <EmptyNoticeFilters type={"mainProducts"}/>
                    : <>
                        {
                            mainProducts.rows.map((c, index) =>
                                <TableRowMainProduct
                                    key={index}
                                    id={c.id}
                                    name={c.name}
                                    color={index % 2 === 0 ? "#F9FAFB" : "#FFFFFF"}
                                    status={c.is_active}
                                    category={c.category.name}
                                    subCategory={c.subCategory.name}
                                    permision={true}
                                />
                            )
                        }
                        <TablePagination count={mainProducts.count}/>
                    </>
            }
        </div>
    );
};

export default MainProductsTable;
