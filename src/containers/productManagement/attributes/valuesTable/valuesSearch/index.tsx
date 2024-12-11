import React from "react";
import styles from "@/styles/categories.module.scss";

interface ITableHeader {
    title: string;
    count: number;
    setAddAttributeModal: (x: boolean) => void;
}

const ValuesSearch = ({title, count, setAddAttributeModal}: ITableHeader) => {
    const handleOpenValueAddModal = () => {
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
        setAddAttributeModal(true);
    };

    return (
        <div
            className={styles.tableHeaderContainer}
            style={count === 0 ? {paddingTop: "32px"} : undefined}
        >
            <span className={"text-18_28_inter text-default-primary"}>{title}</span>
            <div className={styles.searchContainer}>
                {
                    count > 0 && <button
                        className={"btnPrim"}
                        onClick={handleOpenValueAddModal}
                    >
                        <svg
                            className={"btnIcon"}
                            width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus">
                                <path id="Icon" d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333" stroke="#201F27"
                                      strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                        <span>Add another value</span>
                    </button>
                }
            </div>
        </div>
    );
};

export default ValuesSearch;
