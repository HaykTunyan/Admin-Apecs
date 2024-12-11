import React from "react";
import styles from "@/styles/categories.module.scss";
import {useRouter, useSearchParams} from "next/navigation";

interface IEmptyNotice {
    searchValue: string;
}

const SearchEmpty = ({searchValue}: IEmptyNotice) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClearSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={styles.searchEmpty}>
            <div className={styles.searchEmptyContainer}>
                <div className={styles.plusSquare}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="search-lg">
                            <path id="Icon"
                                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                                  stroke="#667085" strokeWidth="1.66667" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </g>
                    </svg>

                </div>
                <div className={styles.textsSearch}>
                    <span className={"text-18_28 font-medium"}>No &apos;{searchValue}&apos; found</span>
                    <span className={"text-14_faux text-tertiary"}>Please try different keywords</span>
                </div>
                <button
                    className={"btnSec"}
                    onClick={handleClearSearch}
                >
                    <span>Clear search</span>
                </button>
                <img
                    className={styles.searchSquares}
                    src="/icons/product/searchPatter.svg"
                    alt="squares"
                />
            </div>
        </div>
    );
};

export default SearchEmpty;
