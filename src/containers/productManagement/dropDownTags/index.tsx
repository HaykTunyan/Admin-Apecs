import React, {useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface IDropDown {
    tags: string[];
    selectedTag: string;
    onSelect: (x: string) => void;
}

const DropDownTags = ({selectedTag, tags, onSelect}: IDropDown) => {
    const [currentTag, setCurrentTag] = useState<string>(selectedTag ? selectedTag : "");
    const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);

    const dropDownRef = useRef(null);
    const dropDownRefExclude = useRef(null);
    useOnClickOutside(dropDownRef, setDropDownOpened, dropDownRefExclude);

    const handleSelectCategory = (tag: string) => {
        setCurrentTag(tag);
        setDropDownOpened(false);
        onSelect(tag);
    };

    return (
        <div className={"dropDownContainer"}>
            <div
                ref={dropDownRefExclude}
                className={`dropDownSelected ${dropDownOpened ? "dropDownSelectedOpened" : ""}`}
                onClick={() => setDropDownOpened(!dropDownOpened)}
            >
                {
                    currentTag
                        ? <span className={"text-16_24_inter grey-light"}>{currentTag}</span>
                        : <span className={"text-16_24_inter text-grey-light"}>Select...</span>
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
                        tags.map((tag: string, index) =>
                            <div
                                key={index}
                                onClick={() => handleSelectCategory(tag)}
                                className={`
                                dropDownItem
                                ${currentTag === tag ? "dropDownItemSelected" : ""}
                                `}
                            >
                                <div className={"dropDownNameWrapper"}>
                                    <span className={"text-16_24_inter text-default-primary"}>{tag}</span>
                                </div>
                                {
                                    currentTag === tag &&
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
                    }
                </div>
            }
        </div>
    );
};

export default DropDownTags;
