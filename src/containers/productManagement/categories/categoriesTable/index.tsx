import React from "react";
import styles from "@/styles/categories.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import TableSearch from "@/containers/productManagement/categories/categoriesTable/tableSearch";
import TableHeader from "@/containers/productManagement/categories/categoriesTable/tableHeader";
import TableRow from "@/containers/productManagement/categories/categoriesTable/tableRow";
import {GetCategoriesResponse} from "@/utils/types";
import SearchEmpty from "@/containers/productManagement/searchEmpty";
import TablePagination from "@/containers/productManagement/tablePagination";

interface ICategoriesTable {
    categories: GetCategoriesResponse;
    searchValue: string;
}

const CategoriesTable = ({categories, searchValue}: ICategoriesTable) => {
    const decodedToken = useSelector(
        (state: RootState) => state.token.decodedToken
    );

    const accessPermissions = decodedToken?.permissions;

    return (
        <div className={styles.tableContainer}>
            <TableSearch
                searchValue={searchValue}
                type={"category"}
                title={"Categories"}
            />
            {
                categories.count > 0 && <TableHeader/>
            }
            {
                categories.count === 0
                    ? <SearchEmpty
                        searchValue={searchValue}
                    />
                    : categories.rows.map((c, index) =>
                        <TableRow
                            key={index}
                            id={c.id}
                            name={c.name}
                            color={index % 2 === 0 ? "#F9FAFB" : "#FFFFFF"}
                            title={c.description}
                            permision={accessPermissions}
                        />
                    )
            }
            <TablePagination count={categories.count}/>
        </div>
    );
};

export default CategoriesTable;
