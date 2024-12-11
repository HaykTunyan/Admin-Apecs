import React from "react";
import styles from "@/styles/categories.module.scss";
import TableSearch from "@/containers/productManagement/categories/categoriesTable/tableSearch";
import SearchEmpty from "@/containers/productManagement/searchEmpty";

interface ICategoriesTable {
    searchValue: string;
    type: string;
    title: string;
}

const SearchEmptyTable = ({searchValue, type, title}: ICategoriesTable) => {
    return (
        <div className={styles.tableContainer}>
            <TableSearch
                searchValue={searchValue}
                type={type}
                title={title}
            />
            <SearchEmpty
                searchValue={searchValue}
            />
        </div>
    );
};

export default SearchEmptyTable;
