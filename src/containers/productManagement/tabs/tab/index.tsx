import React from "react";
import styles from "@/styles/tabs.module.scss";
import TabBadge from "@/containers/productManagement/tabs/tab/tabBadge";

interface ITab {
    name: string;
    selectedTab: string;
    handleSelect: (x: string) => void;
    quantity: number;
    index: number;
    value: string;
}

const Tab = ({name, handleSelect, quantity, selectedTab, value}: ITab) => {
    return (
        <div
            className={`
            ${styles.tab}
            ${selectedTab === value ? styles.active : ""}
            `}
            onClick={() => handleSelect(value)}
        >
            <span className={`
            ${styles.tabName}
            ${selectedTab === value ? styles.active : ""}
            capitalize
            `}>{name}</span>
            <TabBadge
                quantity={quantity}
                active={selectedTab === value}
            />
        </div>
    );
};

export default Tab;
