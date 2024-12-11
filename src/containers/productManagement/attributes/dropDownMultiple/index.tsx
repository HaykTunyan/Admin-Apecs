import React, {useEffect, useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export interface ICategory {
    id: string;
    name: string;
}

interface IDropDown {
    categories: ICategory[];
    selectedCategories: ICategory[];
    onAdd: (selectedCategory: ICategory) => void;
    onRemove: (selectedCategory: ICategory) => void;
}

const DropDownMultiple = ({
                              categories,
                              onAdd,
                              onRemove,
                              selectedCategories
                          }: IDropDown) => {
    const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchedCategories, setSearchedCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        setSearchedCategories(categories);
    }, [categories]);

    const inputRef = useRef<HTMLInputElement>(null);

    const dropDownRef = useRef(null);
    const dropDownRefExclude = useRef(null);
    useOnClickOutside(dropDownRef, setDropDownOpened, dropDownRefExclude);

    const handleToggleCategory = (e: any, category: ICategory) => {
        e.stopPropagation();

        const exists = selectedCategories.some((selected) => selected.id === category.id);

        if (exists) {
            onRemove(category);
        } else {
            onAdd(category);
        }
    };

    const handleRemoveCategory = (e: any, category: ICategory) => {
        e.stopPropagation();
        onRemove(category);
    };

    useEffect(() => {
        const newSearch = categories
            .filter((c) => c.name.toLowerCase().includes(searchInput.toLowerCase()));

        setSearchedCategories([...newSearch]);
    }, [searchInput]);

    const handleStartInput = (e: any) => {
        e.stopPropagation();
        setDropDownOpened(true);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={"dropDownContainer"}>
            <div
                ref={dropDownRefExclude}
                className={`
                dropDownSelectedMultiple ${dropDownOpened ? "dropDownSelectedOpened" : ""}
                ${selectedCategories.length > 0 ? "dropdownRadius" : ""}
                `}
                onClick={() => setDropDownOpened(!dropDownOpened)}
            >
                <div
                    className={"selectedWithSearchIcon"}
                >
                    <svg
                        onClick={handleStartInput}
                        className={"choiceSearch"}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="search-lg">
                            <path id="Icon"
                                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                                  stroke="#667085" strokeWidth="1.66667" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <div className={"multipleInputContainer"}>
                        {
                            selectedCategories.length > 0 && selectedCategories.map((item, index) =>
                                <div
                                    key={index}
                                    className={"selectedCategoryWrapper"}
                                >
                                    <span className={"text-16_20 text-grey-light-700"}>{item.name}</span>
                                    <svg
                                        onClick={(e) => handleRemoveCategory(e, item)}
                                        className={"choiceRemove"}
                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="x-close">
                                            <path id="Icon" d="M18 6L6 18M6 6L18 18" stroke="#98A2B3"
                                                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                    </svg>
                                </div>
                            )
                        }
                        <input
                            ref={inputRef}
                            value={searchInput}
                            onClick={(e) => handleStartInput(e)}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className={"inputDropDown"}
                            type="text"
                            placeholder={"Select..."}
                        />
                    </div>
                </div>
                {/*{*/}
                {/*    currentCategory*/}
                {/*        ? <span className={'text-16_20 text-default-primary'}>{currentCategory.name}</span>*/}
                {/*        : <span className={'text-16_20 text-grey-light'}>Select...</span>*/}
                {/*}*/}
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
                        searchedCategories.length > 0
                            ? searchedCategories.map((category: ICategory, index) =>
                                <div
                                    key={index}
                                    onClick={(e) => handleToggleCategory(e, category)}
                                    className={`
                                dropDownItem
                                ${selectedCategories.some((selected) => selected.id === category.id) ? "dropDownItemSelected" : ""}
                                `}
                                >
                                    <div className={"dropDownNameWrapper"}>
                                        <span className={"text-16_24_inter text-default-primary"}>{category.name}</span>
                                    </div>
                                    {
                                        selectedCategories.some((selected) => selected.id === category.id) &&
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

export default DropDownMultiple;
