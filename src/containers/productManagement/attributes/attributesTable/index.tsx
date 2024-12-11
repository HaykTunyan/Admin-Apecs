import React from "react";
import styles from "@/styles/categories.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import TableSearch from "@/containers/productManagement/categories/categoriesTable/tableSearch";
import TablePagination from "@/containers/productManagement/tablePagination";
import AttributesTableRow from "@/containers/productManagement/attributes/attributesTable/attributesTableRow";
import AttributesHeader from "@/containers/productManagement/attributes/attributesTable/attributesHeader";
import {GetAttributesResponse} from "@/utils/types";
import SearchEmpty from "@/containers/productManagement/searchEmpty";

interface ICategoriesTable {
    currentAttributes: GetAttributesResponse;
    searchValue: string;
}

const tagEnums: { [key: string]: string } = {
    "FINISH_TYPE": "Finish",
    "MECHANISM_TYPE": "Mechanism Type",
    "INTERNAL_SIDE_SIZE": "Internal side A",
    "EXTERNAL_SIDE_SIZE": "External side B",
    "CYLINDER_VARIATION": "Cylinder variation",
    "KEY_COUNT": "Key count"
};

const CategoriesTable = ({currentAttributes, searchValue}: ICategoriesTable) => {
    const decodedToken = useSelector(
        (state: RootState) => state.token.decodedToken
    );

    const accessPermissions = decodedToken?.permissions;

    return (
        <div className={styles.tableContainer}>
            <TableSearch
                searchValue={searchValue}
                type={"attributes"}
                title={"Attributes"}
            />
            {
                currentAttributes.count > 0 && <AttributesHeader/>
            }
            {
                currentAttributes.count === 0
                    ? <SearchEmpty
                        searchValue={searchValue}
                    />
                    : currentAttributes.rows.map((c, index) =>
                        <AttributesTableRow
                            key={index}
                            id={c.id}
                            name={c.name}
                            type={tagEnums[c.type]}
                            color={index % 2 === 0 ? "#F9FAFB" : "#FFFFFF"}
                            categories={c.categories}
                            permision={accessPermissions}
                        />
                    )
            }
            <TablePagination count={currentAttributes.count}/>
        </div>
    );
};

export default CategoriesTable;
