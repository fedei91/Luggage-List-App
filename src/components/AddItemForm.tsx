import React, { useState, FormEvent, ChangeEvent } from "react";
import { useLanguageContext } from "../languageContext";

interface AddItemFormProps {
    onSubmit: (newItemName: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSubmit }) => {
    const { t } = useLanguageContext();

    const [newItemName, setNewItemName] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (newItemName.trim() !== "") {

            onSubmit(newItemName.trim());
            setNewItemName("");

        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setNewItemName(value);

    };

    return (
        <>
        AddItemForm component
        <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
            <label htmlFor="item">{t('suitcaseItemList.newItem')}</label>
            <input
                value={newItemName}
                onChange={handleChange}
                type="text"
                id="item"
            />
        </div>

        <button type="submit" className="btn">
            {t('suitcaseItemList.add')}
        </button>
    </form>
    </>
    );
}

export default AddItemForm;