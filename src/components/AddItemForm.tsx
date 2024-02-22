import React, { useState, FormEvent, ChangeEvent } from "react";

interface AddItemFormProps {
    onSubmit: (suitcaseId: string, newItemName: string) => void;
    suitcaseId: string;

}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSubmit, suitcaseId }) => {
    const [newItemName, setNewItemName] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (newItemName.trim() !== "") {

            onSubmit(suitcaseId, newItemName.trim());
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
            <label htmlFor="item">New Item</label>
            <input
                value={newItemName}
                onChange={handleChange}
                type="text"
                id="item"
            />
        </div>

        <pre>
            { JSON.stringify(newItemName)}
        </pre>

        <button type="submit" className="btn">
            Add
        </button>
    </form>
    </>
    );
}

export default AddItemForm;