import React from "react";
import styles from "@/styles/categories.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import TableSearch from "@/containers/productManagement/categories/categoriesTable/tableSearch";
import SubTableRow from "@/containers/productManagement/subCategories/subCategoriesTable/subTableRow";
import SubTableHeader from "@/containers/productManagement/subCategories/subCategoriesTable/subTableHeader";
import TablePagination from "@/containers/productManagement/tablePagination";
import {GetSubCategoriesResponse} from "@/utils/types";
import SearchEmpty from "@/containers/productManagement/searchEmpty";

interface ICategoriesTable {
    currentSubCategories: GetSubCategoriesResponse;
    searchValue: string;
}

const CategoriesTable = ({currentSubCategories, searchValue}: ICategoriesTable) => {
    const decodedToken = useSelector(
        (state: RootState) => state.token.decodedToken
    );

    const accessPermissions = decodedToken?.permissions;

    return (
        <div className={styles.tableContainer}>
            <TableSearch
                searchValue={searchValue}
                type={"subcategory"}
                title={"Sub-categories"}
            />
            {
                currentSubCategories.count > 0 && <SubTableHeader/>
            }
            {
                currentSubCategories.count === 0 ?
                    <SearchEmpty
                        searchValue={searchValue}
                    />
                    : currentSubCategories.rows.map((c, index) =>
                        <SubTableRow
                            key={index}
                            id={c.id}
                            name={c.name}
                            color={index % 2 === 0 ? "#F9FAFB" : "#FFFFFF"}
                            title={c.description}
                            image={c.image?.src || ""}
                            category={c?.category?.name}
                            permision={accessPermissions}
                        />
                    )
            }
            <TablePagination count={currentSubCategories.count}/>
        </div>
    );
};

export default CategoriesTable;
