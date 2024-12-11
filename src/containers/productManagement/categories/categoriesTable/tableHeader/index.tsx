import React, {useEffect, useState} from "react";
import styles from "@/styles/categories.module.scss";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const TableHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialSortOrder = searchParams.get("sortOrder") || "ASC";

    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">(initialSortOrder as "ASC" | "DESC");

    const toggleSort = () => {
        const newSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
        setSortOrder(newSortOrder);

        const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
        params.set("sortOrder", newSortOrder);
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        const urlSortOrder = searchParams.get("sortOrder") || "ASC";
        setSortOrder(urlSortOrder as "ASC" | "DESC");
    }, [searchParams]);

    return (
        <div className={styles.tableHeaders}>
            <div className={styles.tableHeader}>
                <div
                    onClick={toggleSort}
                    className={styles.nameWithArrow}
                >
                    <span className={"text-12_18 text-tertiary"}>Name</span>
                    <svg
                        className={`${styles.sortArrow} transition duration-300 ${sortOrder === "DESC" ? "rotate-180" : ""}`}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="arrow-up">
                            <path id="Icon"
                                  d="M7.99992 12.6663V3.33301M7.99992 3.33301L3.33325 7.99967M7.99992 3.33301L12.6666 7.99967"
                                  stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.nameWithArrow}>
                    <span className={"text-12_18 text-tertiary"}>Description</span>
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

export default TableHeader;
