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

        setSuitcases(prevSuitcases => [...prevSuitcases, newSuitcase]);
        setNewSuitcaseName('');

        localStorage.setItem('suitcases', JSON.stringify([...suitcases, newSuitcase]));
    }
};

  const toggleSuitcase = (id: string, closed: boolean) => {
    const updatedSuitcases = suitcases.map(suitcase => {
      if (suitcase.id === id) {
        const updatedItems = suitcase.items.map(item => ({ ...item, checked: !closed }));
        return { ...suitcase, closed: !closed, items: updatedItems };
      }
      return suitcase;
    });
    setSuitcases(updatedSuitcases);

  }

  const deleteSuitcase = (id: string) => {
    const updatedSuitcases = suitcases.filter(suitcase => suitcase.id !== id);
    setSuitcases(updatedSuitcases);
    localStorage.setItem('suitcases', JSON.stringify(updatedSuitcases));
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
          toggleSuitcase={toggleSuitcase}
          deleteSuitcase={deleteSuitcase}
          addSuitcaseItem={addSuitcase}
          setSuitcases={setSuitcases}
        />
        <AddSuitcaseForm onSubmit={addSuitcase} onInputChange={handleInputChange} />
      </nav>
    </div>

  );
};

export default Home;
