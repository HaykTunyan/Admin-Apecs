import React, {useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export interface ICategory {
    id: string;
    name: string;
}

interface IDropDown {
    categories: ICategory[];
    selectedCategory: ICategory;
    setSelectedCategory: (selectedCategory: ICategory) => void;
}

const DropDown = ({categories, selectedCategory, setSelectedCategory}: IDropDown) => {
    const [currentCategory, setCurrentCategory] = useState<ICategory>(selectedCategory);
    const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);

    const dropDownRef = useRef(null);
    const dropDownRefExclude = useRef(null);
    useOnClickOutside(dropDownRef, setDropDownOpened, dropDownRefExclude);

    const handleSelectCategory = (category: ICategory) => {
        setCurrentCategory(category);
        setDropDownOpened(false);
        setSelectedCategory(category);
    };

    return (
        <div className={"dropDownContainer"}>
            <div
                ref={dropDownRefExclude}
                className={`dropDownSelected ${dropDownOpened ? "dropDownSelectedOpened" : ""}`}
                onClick={() => setDropDownOpened(!dropDownOpened)}
            >
                {
                    currentCategory.name
                        ? <span className={"text-16_20 text-default-primary"}>{currentCategory.name}</span>
                        : <span className={"text-16_20 text-grey-light"}>Select...</span>
                }
                <svg
                    className={`dropDownIcon ${dropDownOpened ? "dropDownIconRotated" : ""}`}
                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                          fill="#2B2A28"/>
                </svg>
            </div>
            {
                dropDownOpened && <div
                    ref={dropDownRef}
                    className={"dropDownList"}>
                    {
                        categories.length > 0 ?
                            categories.map((category: ICategory, index) =>
                                <div
                                    key={index}
                                    onClick={() => handleSelectCategory(category)}
                                    className={`
                                dropDownItem
                                ${currentCategory?.name === category.name ? "dropDownItemSelected" : ""}
                                `}
                                >
                                    <div className={"dropDownNameWrapper"}>
                                        <span className={"text-16_24_inter text-default-primary"}>{category.name}</span>
                                    </div>
                                    {
                                        currentCategory?.name === category.name &&
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
                            )
                            : <div className={"noResult"}>
                                <span className={"text-16_24_inter text-tertiary"}>Didn&apos;t find results</span>
                            </div>
                    }
                </div>
            }
        </div>
    );
};

export default DropDown;
