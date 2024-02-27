import React from 'react';
import { useLanguageContext } from '../languageContext';

interface SuitcaseItemProps {
    id: string;
    name: string;
    checked: boolean;
    toggleItem: (checked: boolean) => void;
    deleteItem: () => void;
}

const SuitcaseItem: React.FC<SuitcaseItemProps> = ({ id, name, checked, toggleItem, deleteItem }) => {
    const { t } = useLanguageContext();

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
            <button onClick={deleteItem}>{t('suitcaseItem.delete')}</button>
        </li>
    );
}

export default SuitcaseItem;