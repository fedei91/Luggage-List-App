import React from "react";
import SuitcaseItem from "./SuitcaseItem";

interface SuitcaseItem {
    id: string;
    name: string;
    checked: boolean;

}

interface Suitcase {
    id: string;
    name: string;
    closed: boolean;
    items: SuitcaseItem[];
    
}

interface SuitcaseListProps {
    suitcases: Suitcase[];
    toggleItem: (suitcaseId: string, itemId: string, checked: boolean) => void;
    toggleSuitcase: (id: string, closed: boolean) => void;
    deleteSuitcase: (id: string) => void;
}

const SuitcaseList: React.FC<SuitcaseListProps> = ({ suitcases, toggleItem, toggleSuitcase, deleteSuitcase }) => {
    return (
        <div>
            {suitcases.map(suitcase => (
                <div key={suitcase.id} className="suitcase">
                    <h3>{suitcase.name}</h3>
                    <button onClick={() => toggleSuitcase(suitcase.id, !suitcase.closed)}>
                        {suitcase.closed ? 'Open' : 'Close'}
                    </button>
                    <button onClick={() => deleteSuitcase(suitcase.id)}>Delete</button>
                    <ul>
                        {suitcase.items.map(item => (
                            <SuitcaseItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                checked={item.checked}
                                toggleItem={checked => toggleItem(suitcase.id, item.id, checked)}
                            />
                        ))}
                    </ul>
                    {suitcase.items.every(item => item.checked) && <p>Suitcase Completed!</p>}
                </div>
            ))}
        </div>
    );
}

export default SuitcaseList;