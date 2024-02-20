import React from "react";
import { useLanguageContext } from "../languageContext";

const LanguageSelect: React.FC = () => {
  const { languages, onClickLanguageChange } = useLanguageContext();

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
