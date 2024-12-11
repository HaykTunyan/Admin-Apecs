import React from "react";
import styles from "@/styles/add.module.scss";
import DropDownAttributes from "@/containers/productManagement/list/productItems/dropDownAttributes";
import {IValue} from "@/containers/productManagement/attributes/addAttr";

interface IValues {
    currentAttributes: any;
    onSelect: (values: any) => void;
    selectedValues: any;
    edit: boolean;
}

const Values = ({currentAttributes, onSelect, selectedValues}: IValues) => {
    const handleSelectValue = (attributeId: string, value: IValue) => {
        const valueToUpdate = {id: value.id, value: value.value, attribute: {id: attributeId}};
        const updatedValues = [...selectedValues];
        const index = updatedValues.findIndex((val) => val.attribute.id === attributeId);
        if (index !== -1) {
            updatedValues[index] = valueToUpdate;
        } else {
            updatedValues.push(valueToUpdate);
        }
        onSelect(updatedValues);
    };

    const findSelectedValue = (attributeId: string): IValue | null => {
        return selectedValues.find((value: any) => value?.attribute?.id === attributeId) || null;
    };

    return (
        <div className={styles.attributes}>
            <span className="text-16_20 text-grey-light-700">Product attributes</span>
            <div className={styles.grid}>
                {currentAttributes.map((attribute: any, index: number) => (
                    <div key={attribute.id} className="inputWithLabel">
                        <label className="text-fg-disabled">{attribute.name} (*)</label>
                        <DropDownAttributes
                            id={attribute.id}
                            values={attribute.values}
                            selectedValue={findSelectedValue(attribute.id)}
                            onSelect={(id, value) => handleSelectValue(id, value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Values;
