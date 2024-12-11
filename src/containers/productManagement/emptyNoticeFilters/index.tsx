import React from "react";
import styles from "@/styles/categories.module.scss";

interface IEmptyNotice {
    type: string;
}

const EmptyNoticeFilters = ({type}: IEmptyNotice) => {
    return (
        <div className={styles.filtersEmpty}>
            <div className={styles.emptyContainer}>
                <div className={styles.plusSquare}>
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="search-lg">
                            <path id="Icon"
                                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                                  stroke="#667085" strokeWidth="1.66667" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div
                    className={styles.texts}
                    style={type === "value" ? {marginBottom: "4px"} : undefined}
                >
                    {
                        type === "mainProducts"
                            ? <span className={"text-18_28_inter font-medium"}>No main products found</span>
                            : <span className={"text-18_28_inter font-medium"}>No product items found</span>
                    }
                </div>
                <img
                    className={styles.squares}
                    src="/icons/product/squares.svg"
                    alt="squares"
                />
            </div>
        </div>
    );
};

export default EmptyNoticeFilters;
