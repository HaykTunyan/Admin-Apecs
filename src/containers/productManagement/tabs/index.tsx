import React from "react";
import styles from "@/styles/tabs.module.scss";
import Tab from "@/containers/productManagement/tabs/tab";
import {ITab} from "@/utils/types";
import {useRouter, useSearchParams} from "next/navigation";

interface ITabs {
    tabs: ITab[];
    selectedTab: string;
    type: string;
}

const Tabs = ({tabs, selectedTab, type}: ITabs) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSelect = (tabName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("sortOrder");
        params.delete("search");
        params.delete("page");
        params.delete("status");
        params.delete("statusItem");
        params.delete("category");
        params.delete("mainProduct");
        params.set(type, tabName);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={"flex flex-col gap-6"}>
            <span className={"text-32_n"}>
                {
                    type === "itemType"
                        ? "Products"
                        : "Product Management Settings"
                }
            </span>
            <div className={styles.tabs}>
                {
                    tabs.map((tab, i) =>
                        <Tab
                            key={i}
                            index={i}
                            selectedTab={selectedTab}
                            name={tab.name}
                            value={tab.value}
                            handleSelect={handleSelect}
                            quantity={tab.quantity}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Tabs;
