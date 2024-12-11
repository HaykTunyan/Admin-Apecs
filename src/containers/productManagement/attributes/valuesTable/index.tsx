import React, {useEffect, useState} from "react";
import styles from "@/styles/categories.module.scss";
import ValuesHeader from "@/containers/productManagement/attributes/valuesTable/valuesHeader";
import ValuesSearch from "@/containers/productManagement/attributes/valuesTable/valuesSearch";
import EmptyNotice from "@/containers/productManagement/emptyNotice";
import AddAttributeModal from "@/containers/productManagement/attributes/addAttributeModal";
import ValuesTableRow from "@/containers/productManagement/attributes/valuesTable/valuesTableRow";
import {IValue} from "@/containers/productManagement/attributes/addAttr";

interface ICategoriesTable {
    currentValues: IValue[];
    handleAddANewValue: (x: string) => void;
    handleDeleteValue: (x: IValue) => void;
    handleEditValue: (x: IValue) => void;
}

const ValuesTable = ({currentValues, handleAddANewValue, handleDeleteValue, handleEditValue}: ICategoriesTable) => {
    const [addAttributeModal, setAddAttributeModal] = useState<boolean>(false);
    const [valueToEdit, setValueToEdit] = useState<IValue>({
        value: "",
        id: ""
    });

    useEffect(() => {
        if (addAttributeModal) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            setValueToEdit({
                value: "",
                id: ""
            });
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [addAttributeModal]);

    const handleAddValue = (newValue: string) => {
        handleAddANewValue(newValue);
    };

    const handleEditExistingValue = (currentValue: IValue) => {
        setAddAttributeModal(true);
        setValueToEdit(currentValue);
    };

    const handleEditValueFromModal = (editedValue: IValue) => {
        handleEditValue(editedValue);
        setAddAttributeModal(false);
    };

    return (
        <div
            className={styles.tableContainer}
            style={currentValues.length === 0 ? {paddingBottom: "48px", overflow: "hidden"} : undefined}
        >
            {
                addAttributeModal && <AddAttributeModal
                    name={valueToEdit.value}
                    id={valueToEdit.id}
                    setIsDeleteRequested={setAddAttributeModal}
                    onAddValue={handleAddValue}
                    onEditValue={handleEditValueFromModal}
                />
            }
            <ValuesSearch
                title={"Values"}
                count={currentValues.length}
                setAddAttributeModal={setAddAttributeModal}
            />
            {
                currentValues.length === 0 && <EmptyNotice
                    type={"value"}
                    link={""}
                    openModal={setAddAttributeModal}
                />
            }
            {
                currentValues.length > 0 && <ValuesHeader/>
            }
            {
                currentValues.map((c: any, index: number) =>
                    <ValuesTableRow
                        key={index}
                        id={c.id}
                        name={c.value}
                        onDelete={handleDeleteValue}
                        onEdit={handleEditExistingValue}
                        color={index % 2 !== 0 ? "#F9FAFB" : "#FFFFFF"}
                    />
                )
            }
        </div>
    );
};

export default ValuesTable;
