import React, { useEffect, useState } from 'react';
import { useLanguageContext } from '../languageContext';
import SuitcaseList from './SuitcaseList';
import AddSuitcaseForm from './AddSuitcaseForm';

interface Suitcase {
  id: string;
  name: string;
  closed: boolean;
  items: { id: string; name: string; checked: boolean }[];
}

const Home: React.FC = () => {
  const { t } = useLanguageContext();

  const [suitcases, setSuitcases] = useState<Suitcase[]>(() => {
    const localData = localStorage.getItem('suitcases');
    return localData ? JSON.parse(localData) : [];
  });

  const [newSuitcaseName, setNewSuitcaseName] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('suitcases', JSON.stringify(suitcases));
  }, [suitcases])

  const addSuitcase = () => {

    if (newSuitcaseName.trim() !== '') {

      const newSuitcase: Suitcase = {
        id: crypto.randomUUID(),
        name: newSuitcaseName.trim(),
        closed: false,
        items: []
      };

      setSuitcases([...suitcases, newSuitcase]);
      setNewSuitcaseName('');

    }
  };

  const toggleSuitcase = (id: string, closed: boolean) => {
    const updatedSuitcases = suitcases.map(suitcase =>
      suitcase.id === id ? { ...suitcase, closed } : suitcase
    );
    setSuitcases(updatedSuitcases);

  }

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
  }

  const deleteSuitcase = (id: string) => {
    const updatedSuitcases = suitcases.filter(suitcases => suitcases.id !== id);
    setSuitcases(updatedSuitcases);
  };

  const handleInputChange = (value: string) => {
    setNewSuitcaseName(value);
  }

  return (
    <div>
      <h2>{t('home.welcome')}</h2>
      <nav>
        <SuitcaseList
          suitcases={suitcases}
          toggleItem={toggleItem}
          toggleSuitcase={toggleSuitcase}
          deleteSuitcase={deleteSuitcase}
          addSuitcaseItem={addSuitcase}
        />
        <AddSuitcaseForm onSubmit={addSuitcase} onInputChange={handleInputChange} />
      </nav>
    </div>

  );
};

export default Home;
