import React, { useEffect, useState } from "react";
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
    addSuitcaseItem: (suitcaseId: string, newItem: SuitcaseItem) => void;
}

const SuitcaseList: React.FC<SuitcaseListProps> = ({ suitcases, toggleItem, toggleSuitcase, deleteSuitcase, addSuitcaseItem }) => {
    const [localSuitcases, setLocalSuitcases] = useState<Suitcase[]>(suitcases);

    useEffect(() => {
        const storedSuitcases = localStorage.getItem('suitcases');
        if (storedSuitcases) {
            setLocalSuitcases(JSON.parse(storedSuitcases));
        }
    }, []);

    useEffect(() => {
        setLocalSuitcases(suitcases);
    }, [suitcases]);

    useEffect(() => {
        localStorage.setItem('suitcases', JSON.stringify(localSuitcases));
    }, [localSuitcases]);

    const addItemToSuitcase = (suitcaseId: string, newItemName: string) => {
        const updatedSuitcases = localSuitcases.map(suitcase => {
            if (suitcase.id === suitcaseId) {
                const newItem: SuitcaseItem = {
                    id: crypto.randomUUID(),
                    name: newItemName,
                    checked: false
                };
                addSuitcaseItem(suitcaseId, newItem);
                return {
                    ...suitcase,
                    items: [...suitcase.items, newItem]
                };
            }
            return suitcase;
        });
        setLocalSuitcases(updatedSuitcases);
    };

    const handleToggleSuitcase = (id: string, closed: boolean) => {
        toggleSuitcase(id, closed);
        const updatedSuitcases = localSuitcases.map(suitcase => {
            if (suitcase.id === id) {
                return {
                    ...suitcase,
                    closed: !closed
                };
            }
            return suitcase;
        });
        setLocalSuitcases(updatedSuitcases);
    };

    const handleDeleteSuitcase = (id: string) => {
        deleteSuitcase(id);
        const updatedSuitcases = localSuitcases.filter(suitcase => suitcase.id !== id);
        setLocalSuitcases(updatedSuitcases);
    };

    return (
        <>
            <div>
                SuitcaseList component
            </div>
            <br />
            <div>
                <hr></hr>
                {localSuitcases.map(suitcase => (
                    <div key={suitcase.id} className="suitcase">
                        <h3>{suitcase.name}</h3>
                        <button onClick={() => handleToggleSuitcase(suitcase.id, suitcase.closed)}>
                            {suitcase.closed ? 'Open' : 'Close'}
                        </button>
                        <button onClick={() => handleDeleteSuitcase(suitcase.id)}>Delete</button>
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
                        />

                        {suitcase.items.length > 0 ? (suitcase.items.every(item => item.checked) ? <p>Suitcase Completed!</p> : null) : <p>No items</p>}
                        <hr></hr>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SuitcaseList;
