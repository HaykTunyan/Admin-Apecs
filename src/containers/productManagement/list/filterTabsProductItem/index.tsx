import React, {useEffect, useState} from "react";
import styles from "@/styles/categories.module.scss";
import {useRouter, useSearchParams} from "next/navigation";
import {ICategoryFilter} from "@/utils/types";
import DropDownFiltersProduct from "@/containers/productManagement/dropDownFiltersProduct";
import DropDownFiltersMainProduct from "@/containers/productManagement/dropDownFiltersMainProduct";
import {getMainProducts} from "@/api/productManagement/mainProduct/getMainProducts";

const statuses = ["live on site", "draft"];

const FilterTabsProductItem = () => {
    const [mainProducts, setMainProducts] = useState<ICategoryFilter[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetFilters, setResetFilters] = useState(false);

    useEffect(() => {
        getMainProducts()
            .then(res => {
                if (res) {
                    const categoryFilters = res.rows.map(i => {
                        return {
                            id: i.id,
                            name: i.name,
                        };
                    });

                    setMainProducts(categoryFilters);
                }
            });
    }, []);

    const areFiltersApplied =
        searchParams.get("statusItem") ||
        searchParams.get("mainProduct");

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("statusItem");
        params.delete("mainProduct");

        setResetFilters(true);

        router.push(`?${params.toString()}`, {scroll: false});
    };

    const handleResetComplete = () => {
        setResetFilters(false);
    };

    return (
        <div className={styles.filterTabs}>
            <DropDownFiltersMainProduct
                values={mainProducts}
                resetFilters={resetFilters}
                onResetComplete={handleResetComplete}
            />
            <DropDownFiltersProduct
                values={statuses}
                resetFilters={resetFilters}
                onResetComplete={handleResetComplete}
            />
            <button
                onClick={handleClearFilters}
                className="btnSec btn44"
                disabled={!areFiltersApplied}
            >
                Clear all
            </button>
        </div>
    );
};

export default FilterTabsProductItem;
