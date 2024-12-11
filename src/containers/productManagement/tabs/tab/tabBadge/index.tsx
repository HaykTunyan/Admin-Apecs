import React from "react";
import styles from "@/styles/tabs.module.scss";

interface ITabBadge {
    quantity: number;
    active: boolean;
}

const TabBadge = ({quantity, active}: ITabBadge) => {
    return (
        <div
            className={`
            ${styles.tabCount}
            ${active ? styles.active : ""}
            `}
        >
            <span
                className={`
                ${styles.count}
                ${active ? styles.active : ""}
                `}
            >{quantity}</span>
        </div>
    );
};

export default TabBadge;
