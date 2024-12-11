import React, {useEffect, useState} from "react";
import styles from "@/styles/categories.module.scss";
import DropDownFilters from "@/containers/productManagement/dropDownFilters";
import DropDownFiltersCat from "@/containers/productManagement/dropDownFiltersCat";
import {useRouter, useSearchParams} from "next/navigation";
import {ICategoryFilter} from "@/utils/types";
import {getCategories} from "@/api/productManagement/categories/getCategories";

const statuses = ["active", "inactive"];

const FilterTabs = () => {
    const [categories, setCategories] = useState<ICategoryFilter[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetFilters, setResetFilters] = useState(false);

    useEffect(() => {
        getCategories()
            .then(res => {
                if (res) {
                    const categoryFilters = res.rows.map(i => {
                        return {
                            id: i.id,
                            name: i.name,
                        };
                    });

                    setCategories(categoryFilters);
                }
            });
    }, []);

    const areFiltersApplied =
        searchParams.get("status") ||
        searchParams.get("category");

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("status");
        params.delete("category");

        setResetFilters(true);

        router.push(`?${params.toString()}`, {scroll: false});
    };

    const handleResetComplete = () => {
        setResetFilters(false);
    };

    return (
        <div className={styles.filterTabs}>
            <DropDownFilters
                values={statuses}
                resetFilters={resetFilters}
                onResetComplete={handleResetComplete}
            />
            <DropDownFiltersCat
                values={categories}
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

export default FilterTabs;
