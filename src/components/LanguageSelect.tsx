import React, { useState, useEffect } from "react";
import { useLanguageContext } from "../languageContext";
import i18next from "i18next";

const LanguageSelect: React.FC = () => {
  const { languages, onClickLanguageChange } = useLanguageContext();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    setSelectedLanguage(i18next.language);
  })

  return (
    <select
      style={{
        width: 200,
        position: "relative",
        top: 10,
        left: 10,
        height: "40px",
      }}
      onChange={onClickLanguageChange}
      value={selectedLanguage}
    >
      {Object.keys(languages).map((lng) => (
        <option key={languages[lng].nativeName} value={lng}>
          {languages[lng].nativeName}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
