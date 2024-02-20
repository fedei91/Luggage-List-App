import React from 'react';
import { useLanguageContext } from '../languageContext';

const Home: React.FC = () => {
    const { t } = useLanguageContext();

    return (
        <div>
            <h2>{t('home.welcome')}</h2>
            <p>{t('home.description')}</p>

            <nav>
                <ul>
                    <li><a href="#">{t('navigation.suitcases')}</a></li>
                    <li><a href="#">{t('navigation.addCase')}</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home;
