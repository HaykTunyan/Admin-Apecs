import React, {useEffect, useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useRouter, useSearchParams} from "next/navigation";
import {ICategoryFilter} from "@/utils/types";

interface IDropDownAttributes {
    values: ICategoryFilter[];
    resetFilters: boolean;
    onResetComplete: () => void;
}

const DropDownFilters = ({values, resetFilters, onResetComplete}: IDropDownAttributes) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);
    const dropDownRef = useRef(null);
    const dropDownRefExclude = useRef(null);
    const [selectedValue, setSelectedValue] = useState<ICategoryFilter | undefined>(undefined);

    useOnClickOutside(dropDownRef, () => setDropDownOpened(false), dropDownRefExclude);

    const handleSelectValue = (value: ICategoryFilter) => {
        setDropDownOpened(false);
        setSelectedValue(value);

        const params = new URLSearchParams(searchParams.toString());
        params.set("category", value.id);

        router.push(`?${params.toString()}`, {scroll: false});
    };

    useEffect(() => {
        const filterParam = searchParams.get("category");
        if (filterParam) {
            const selectedCategory = values.find(i => i.id === filterParam);
            setSelectedValue(selectedCategory);
        }
    }, [searchParams, router, values]);

    useEffect(() => {
        if (resetFilters) {
            setSelectedValue(undefined);
            onResetComplete();
        }
    }, [resetFilters, onResetComplete]);

    return (
        <div className="dropDownContainerFilters">
            <div
                ref={dropDownRefExclude}
                className={`dropDownSelectedFilter ${dropDownOpened ? "dropDownSelectedOpened" : ""}`}
                onClick={() => setDropDownOpened(prev => !prev)}
            >
                <span className="text-16_20 text-grey-light line-clamp-1">
                    {selectedValue ? selectedValue.name : "Filter by category"}
                </span>
                <svg
                    className={`dropDownIcon ${dropDownOpened ? "dropDownIconRotated" : ""}`}
                    width="16" height="16" viewBox="0 0 16 16"
                >
                    <path
                        d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                        fill="#2B2A28"
                    />
                </svg>
            </div>
            {
                dropDownOpened &&
                <div ref={dropDownRef} className="dropDownList">
                    {values.map((value, index) =>
                        <div
                            key={index}
                            onClick={() => handleSelectValue(value)}
                            className={`
                            dropDownItem
                            ${value.id === selectedValue?.id ? "dropDownItemSelected" : ""}
                            `}
                        >
                            <span className="text-16_24_inter text-default-primary">{value.name}</span>
                            {
                                value.id === selectedValue?.id &&
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="check">
                                        <path id="Icon" d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#C8AD80"
                                              strokeWidth="1.66667" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </g>
                                </svg>
                            }
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default DropDownFilters;
