import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import styles from "@/styles/categories.module.scss";
import {useRouter, useSearchParams} from "next/navigation";

interface ITableHeader {
    title: string;
    type: string;
    searchValue: string;
    permission?: any;
}

const MainProductTableSearch = ({title, type, searchValue,permission }: ITableHeader) => {
    const enabledAddAttribute = permission?.length && permission.includes("CREATE_ATTRIBUTE");

    const enabledAddCategory = permission?.length && permission.includes("CREATE_CATEGORY");

    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentSearchValue, setCurrentSearchValue] = useState<string>(searchValue || "");
    const urlToAdd = `/product-management/list/${type === "mainProduct" ? "main-product" : "product-item"}/add`;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        setCurrentSearchValue(currentValue);

        const params = new URLSearchParams(searchParams.toString());
        params.set("search", currentValue);
        router.push(`?${params.toString()}`);
    };

    const handleSearch = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        const search = searchParams.get("search");

        setCurrentSearchValue(search || "");
    }, []);

    return (
        <div className={styles.tableHeaderContainer}>
            <span className={"text-18_28_inter text-default-primary"}>{title}</span>
            <div className={styles.searchContainer}>
                <div className={"inputContainer"}>
                    <svg
                        onClick={handleSearch}
                        className={"searchIcon"}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="search-lg">
                            <path id="Icon"
                                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                                  stroke="#667085" strokeWidth="1.66667" strokeLinecap="round"
                                  strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className={"input inputTable"}
                        value={currentSearchValue}
                        onChange={handleSearchInput}
                        placeholder={"Search"}
                    />
                </div>
                <button
                    className={"btnPrim"}
                   disabled={!enabledAddAttribute  && type === "attributes" || !enabledAddCategory  && type === "category"  ||  !enabledAddCategory  && type === "subcategory" }
                    onClick={() => router.push(urlToAdd)}
                >
                    <svg
                        className={"btnIcon"}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus">
                            <path id="Icon" d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333" stroke="#201F27"
                                  strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <span>Add a
                        {
                            type === "mainProduct" && " main product"
                        }
                        {
                            type === "productItem" && " product item"
                        }
                    </span>
                </button>
            </div>
        </div>
    );
};

export default MainProductTableSearch;
