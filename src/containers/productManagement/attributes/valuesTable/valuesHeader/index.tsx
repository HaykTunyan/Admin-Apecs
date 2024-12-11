import React from "react";
import styles from "@/styles/categories.module.scss";

const ValuesHeader = () => {
    return (
        <div className={styles.valuesHeaders}>
            <div className={styles.tableHeader}>
                <div
                    className={styles.nameWithArrow}
                >
                    <span className={"text-12_18 text-tertiary"}>Name</span>
                    <svg
                        className={`${styles.sortArrow} transition duration-300`}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="arrow-up">
                            <path id="Icon"
                                  d="M7.99992 12.6663V3.33301M7.99992 3.33301L3.33325 7.99967M7.99992 3.33301L12.6666 7.99967"
                                  stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
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

export default ValuesHeader;
