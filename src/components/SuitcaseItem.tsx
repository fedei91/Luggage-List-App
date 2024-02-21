import React from 'react';

interface SuitcaseItemProps {
    id: string;
    name: string;
    checked: boolean;
    toggleItem: (checked: boolean) => void;
}

const SuitcaseItem: React.FC<SuitcaseItemProps> = ({ id, name, checked, toggleItem }) => {
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
        </li>
    );
}

export default SuitcaseItem;