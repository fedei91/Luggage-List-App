import { useState, FormEvent, ChangeEvent } from 'react';

interface NewSuitcaseFormProps {
    onSubmit: (newSuitcase: string) => void;
    onInputChange: (value: string) => void;
}

const AddSuitcaseForm: React.FC<NewSuitcaseFormProps> = ({ onSubmit, onInputChange }) => {
    const [newSuitcase, setNewSuitCase] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Form submitted!');
        if (newSuitcase === "") return;

        onSubmit(newSuitcase.trim());
        setNewSuitCase("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setNewSuitCase(value);
        onInputChange(value);
    };

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Suitcase</label>
                <input
                    value={newSuitcase}
                    onChange={handleChange}
                    type="text"
                    id="item"
                />
            </div>
            <button type="submit" className="btn">
                Add
            </button>
        </form>
    )
}

export default AddSuitcaseForm;