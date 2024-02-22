import React, { useState } from "react";
import SuitcaseItem from "./SuitcaseItem";
import AddItemForm from "./AddItemForm";

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
    addSuitcaseItem: (updatedItems: SuitcaseItem[]) => void;
}

const SuitcaseList: React.FC<SuitcaseListProps> = ({ suitcases, toggleItem, toggleSuitcase, deleteSuitcase, addSuitcaseItem }) => {
    const [newItemName, setNewItemName] = useState<string>('');
    
    const addItemToSuitcase = (suitcaseId: string, newItemName: string) => {
        console.log('New item name:', newItemName);
        const updatedSuitcases = suitcases.map(suitcase => {
            if (suitcase.id === suitcaseId) {
                const newItem: SuitcaseItem = {
                    id: crypto.randomUUID(),
                    name: newItemName,
                    checked: false
                };
                
                const updatedItems = [...suitcase.items, newItem];
                console.log(updatedItems);
                addSuitcaseItem(updatedItems);
                return {
                    ...suitcase,
                    items: updatedItems
                };
            }
            return suitcase;
        });
        
        return updatedSuitcases;
    };

    return (
        <>
        <div>
            SuitcaseList component
        </div>
        <br/>
        <div>
        <hr></hr>
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

                    <AddItemForm
                        onSubmit={(newItemName) => addItemToSuitcase(suitcase.id, newItemName)}
                        suitcaseId={suitcase.id}
                    />
                    <pre>
                    {JSON.stringify(suitcase)}
                    </pre>
                    
                    {suitcase.items.length > 0 ? (suitcase.items.every(item => item.checked) ? <p>Suitcase Completed!</p> : null) : <p>No items</p>}
                    <hr></hr>
                </div>
            ))}
        </div>
        </>
    );
}

export default SuitcaseList;