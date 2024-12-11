import React, {useRef, useState} from "react";
import styles from "@/styles/add.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {IValue} from "@/containers/productManagement/attributes/addAttr";

interface IAddAtttributeModal {
    setIsDeleteRequested: (x: boolean) => void;
    onAddValue: (x: string) => void;
    onEditValue: (x: IValue) => void;
    name: string;
    id: string;
}

const AddAttributeModal = ({setIsDeleteRequested, onAddValue, name, id, onEditValue}: IAddAtttributeModal) => {
    const [valueName, setValueName] = useState<string>(name);

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, setIsDeleteRequested);

    const handleAddValue = () => {
        if (id) {
            onEditValue({
                id,
                value: valueName
            });
        } else {
            onAddValue(valueName);
            setIsDeleteRequested(false);
        }
    };

    const disabled = !valueName;

    const handleCloseModal = () => {
        setIsDeleteRequested(false);
    };

    return (
        <div
            className={styles.modalWrapperValues}
            onClick={(e) => e.preventDefault()}
        >
            <div
                ref={modalRef}
                className={styles.attrModal}
            >
                <img
                    className={styles.squares}
                    src="/icons/product/deleteSquare.svg"
                    alt="squares"
                />
                <div
                    onClick={handleCloseModal}
                    className={styles.closeIconWrapper}
                >
                    <svg
                        className={styles.closeIcon}
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="x-close">
                            <path id="Icon" d="M18 6L6 18M6 6L18 18" stroke="#98A2B3" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div className={styles.plusIconWrapper}>
                    <svg
                        className={styles.deleteIcon}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus">
                            <path id="Icon" d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333" stroke="#201F27"
                                  strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div className={styles.textsValue}>
                    <span className={"text-18_28_inter text-default-primary"}>Add an attribute value</span>
                    <span className={"text-14_faux text-tertiary"}>
                        Define how the attribute will be displayed on the product page.
                    </span>
                </div>
                <div className={"inputWithLabel"}>
                    <label
                        htmlFor={"name"}
                        className={"text-utility-gray-700"}
                    >Value name (*)</label>
                    <input
                        id={"name"}
                        value={valueName}
                        onChange={(e) => setValueName(e.target.value)}
                        type="text"
                        className={"input inputWithoutWidth"}
                        placeholder={"Text"}
                    />
                    <span className={"text-14_faux text-tertiary"}>Enter a description for the value (e.g. &apos;Titanium&apos; for material)</span>
                </div>
                <div className={styles.btn}>
                    <button
                        onClick={handleAddValue}
                        className={"btnPrim"}
                        disabled={disabled}
                    >
                        Save and Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAttributeModal;
