import React, {useEffect, useState} from "react";
import styles from "@/styles/categories.module.scss";
import {GetProductItemsResponse} from "@/utils/types";

interface ITableHeaderProductItems {
    onSelectAll: (x: boolean) => void;
    productsIdsToPublish: string[];
    products: GetProductItemsResponse;
    productsWithActiveMain: string[];
}

const TableHeaderProductItems = ({
                                     onSelectAll,
                                     productsIdsToPublish,
                                     productsWithActiveMain,
                                     products
                                 }: ITableHeaderProductItems) => {
    const [allSelected, setAllSelected] = useState<boolean>(false);

    useEffect(() => {
        const isAllSelected = products.rows
            .filter(i => !i.is_published)
            .filter(i => productsWithActiveMain.includes(i.id))
            .every(i => productsIdsToPublish.includes(i.id));

        if (productsIdsToPublish.length === 0) {
            setAllSelected(false);
        } else {
            setAllSelected(isAllSelected);

        }
    }, [productsIdsToPublish, products]);

    const handleSelectAll = (x: boolean) => {
        onSelectAll(x);
    };

    return (
        <div className={styles.tableHeadersProductItems}>
            <div
                className={styles.tableHeaderCheck}
                onClick={() => handleSelectAll(!allSelected)}
            >
                <div className={styles.nameWithArrow}>
                    {
                        allSelected
                            ? <div className={styles.checked}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="check">
                                        <path id="Icon" d="M11.6668 3.5L5.25016 9.91667L2.3335 7" stroke="white"
                                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                </svg>
                            </div>
                            : <div className={styles.checkbox}></div>
                    }
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>SKU-s</span>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Main product</span>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Status</span>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Internal side A</span>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>External side B</span>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Mechanism type</span>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Finish</span>
                </div>
            </div>
            <div className={styles.tableHeaderEnd}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Actions</span>
                </div>
            </div>
        </div>
    );
};

export default TableHeaderProductItems;
