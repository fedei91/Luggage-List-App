import React from 'react';

interface SuitcaseItemProps {
    id: string;
    name: string;
    checked: boolean;
    toggleItem: (checked: boolean) => void;
    deleteItem: () => void;
}

const SuitcaseItem: React.FC<SuitcaseItemProps> = ({ id, name, checked, toggleItem, deleteItem }) => {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={e => toggleItem(e.target.checked)}
                />
                {name}
            </label>
            <button onClick={deleteItem}>Delete</button>
        </li>
    );
}

export default SuitcaseItem;