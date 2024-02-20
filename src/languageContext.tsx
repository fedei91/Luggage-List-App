import { TFunction } from "i18next";
import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
    t: TFunction<"translation", undefined>;
    i18n: {
        language: string;
        changeLanguage: (lang: string) => Promise<unknown>;
    };
    onClickLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    languages: Record<string, { nativeName: string }>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageContextProviderProps {
    children: React.ReactNode;
}

export const LanguageContextProvider: React.FC<LanguageContextProviderProps> = ({ children }) => {
    const languages: Record<string, { nativeName: string }> = {
        en: { nativeName: "English" },
        es: { nativeName: "Spanish" },
    };

    const { t, i18n } = useTranslation();

    const onClickLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
    };

    const value: LanguageContextType = { t, i18n, onClickLanguageChange, languages };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguageContext must be used within a LanguageContextProvider");
    }
    return context;
};
