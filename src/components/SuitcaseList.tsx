import React, { useState, useEffect } from "react";
import SuitcaseItem from "./SuitcaseItem";
import AddItemForm from "./AddItemForm";
import { useLanguageContext } from "../languageContext";

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
    toggleSuitcase: (id: string, closed: boolean) => void;
    deleteSuitcase: (id: string) => void;
    addSuitcaseItem: (suitcaseId: string, newItem: SuitcaseItem) => void;
    setSuitcases: React.Dispatch<React.SetStateAction<Suitcase[]>>;
}

const SuitcaseList: React.FC<SuitcaseListProps> = ({ suitcases, toggleSuitcase, deleteSuitcase, addSuitcaseItem, setSuitcases }) => {
    const { t } = useLanguageContext();
    
    const [allItemsChecked, setAllItemsChecked] = useState<boolean[]>([]);

    useEffect(() => {

        const checkedStatus = suitcases.map(suitcase =>
            suitcase.items.every(item => item.checked)
        );
        setAllItemsChecked(checkedStatus);
    }, [suitcases]);

    const addItemToSuitcase = (suitcaseId: string, newItemName: string) => {
        setSuitcases(prevSuitcases => {
            return prevSuitcases.map(suitcase => {
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
        });
    };

    // const handleToggleSuitcase = (id: string, closed: boolean) => {
    //     const updatedSuitcases = suitcases.map(suitcase => {
    //         if (suitcase.id === id) {
    //             const updatedItems = suitcase.items.map(item => ({ ...item, checked: !closed }));
    //             return { ...suitcase, items: updatedItems, closed: !closed };
    //         }
    //         return suitcase;
    //     });
    //     setSuitcases(updatedSuitcases);
    //     setAllItemsChecked(prev => prev.map(() => !closed));
    // };

    const handleDeleteSuitcase = (id: string) => {
        const updatedSuitcases = suitcases.filter(suitcase => suitcase.id !== id);
        setSuitcases(updatedSuitcases);
    };

    const deleteItem = (suitcaseId: string, itemId: string) => {
        const updatedSuitcases = suitcases.map(suitcase => {
            if (suitcase.id === suitcaseId) {
                const updatedItems = suitcase.items.filter(item => item.id !== itemId);
                return { ...suitcase, items: updatedItems };
            }
            return suitcase;
        });
        setSuitcases(updatedSuitcases);
    };

    const toggleItem = (suitcaseId: string, itemId: string, checked: boolean) => {
        const updatedSuitcases = suitcases.map(suitcase => {
            if (suitcase.id === suitcaseId) {
                const updatedItems = suitcase.items.map(item =>
                    item.id === itemId ? { ...item, checked } : item
                );
                return { ...suitcase, items: updatedItems };
            }
            return suitcase;
        });
        setSuitcases(updatedSuitcases);

        const checkedStatus = updatedSuitcases.map(suitcase =>
            suitcase.items.every(item => item.checked)
        );
        setAllItemsChecked(checkedStatus);
    };

    return (
        <div>
            <div>
                SuitcaseList component
            </div>
            <br />
            <div>
                <hr></hr>
                {suitcases.map((suitcase, index) => (
                    <div key={suitcase.id} className="suitcase">
                        <h3>{suitcase.name}</h3>
                        {/* <button onClick={() => handleToggleSuitcase(suitcase.id, suitcase.closed)}>
                            {allItemsChecked[index] ? 'Close' : 'Open'}
                        </button> */}
                        <button onClick={() => handleDeleteSuitcase(suitcase.id)}>{t('suitcaseList.delete')}</button>
                        <ul>
                            {suitcase.items.map(item => (
                                <div key={item.id}>
                                    <SuitcaseItem
                                        id={item.id}
                                        name={item.name}
                                        checked={item.checked}
                                        toggleItem={checked => toggleItem(suitcase.id, item.id, checked)}
                                        deleteItem={() => deleteItem(suitcase.id, item.id)}
                                    />
                                </div>
                            ))}
                        </ul>

                        <AddItemForm
                            onSubmit={(newItemName) => addItemToSuitcase(suitcase.id, newItemName)}
                        />

                        {suitcase.items.length > 0 ? (allItemsChecked[index] ? <p>Suitcase Completed!</p> : null) : <p>No items</p>}
                        <hr></hr>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuitcaseList;
