import React, {useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {IValue} from "@/containers/productManagement/attributes/addAttr";

interface IDropDownAttributes {
    id: string;
    values: IValue[];
    selectedValue?: IValue | null;
    onSelect: (id: string, value: IValue) => void;
}

const DropDownAttributes = ({id, values, selectedValue, onSelect}: IDropDownAttributes) => {
    const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);
    const dropDownRef = useRef(null);
    const dropDownRefExclude = useRef(null);

    useOnClickOutside(dropDownRef, () => setDropDownOpened(false), dropDownRefExclude);

    const handleSelectValue = (value: IValue) => {
        onSelect(id, value);
        setDropDownOpened(false);
    };

    return (
        <div className="dropDownContainer">
            <div
                ref={dropDownRefExclude}
                className={`dropDownSelected ${dropDownOpened ? "dropDownSelectedOpened" : ""}`}
                onClick={() => setDropDownOpened(prev => !prev)}
            >
                <span className="text-16_20 text-grey-light">
                    {selectedValue ? selectedValue.value : "Select..."}
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
            {dropDownOpened && (
                <div ref={dropDownRef} className="dropDownList">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectValue(value)}
                            className="dropDownItem"
                        >
                            <span className="text-16_24_inter text-default-primary">{value.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownAttributes;
