"use client";

import { useState, useEffect } from "react";
import styles from "./MoodSelector.module.css";

const colorSchemes = {
  default: {
    Amazing: "#FFBF1C",
    Great: "#CAAB5E",
    Neutral: "#9497A0",
    Bad: "#716D7A",
    Awful: "#4D4254",
  },
  pastel: {
    Amazing: "#FFE1F9",
    Great: "#FFD2CD",
    Neutral: "#FFC3A0",
    Bad: "#FFB7A6",
    Awful: "#FFABAB",
  },
  dark: {
    Amazing: "#FFD493",
    Great: "#C09F6F",
    Neutral: "#806A4A",
    Bad: "#403525",
    Awful: "#000000",
  },
  classic: {
    Amazing: "#248C39",
    Great: "#72B55B",
    Neutral: "#D0B142",
    Bad: "#CB8841",
    Awful: "#B63737",
  },
  magic: {
    Amazing: "#D062D8",
    Great: "#AB51B6",
    Neutral: "#853F93",
    Bad: "#602D71",
    Awful: "#3A1B4E",
  },
  amber: {
    Amazing: "#FFC569",
    Great: "#FFAD37",
    Neutral: "#FF9505",
    Bad: "#E2711D",
    Awful: "#CC5803",
  },
  rank: {
    Amazing: "#9FE3FA",
    Great: "#84E1BD",
    Neutral: "#DFB457",
    Bad: "#C9C9C9",
    Awful: "#7F492A",
  },
  nights: {
    Amazing: "#DFB457",
    Great: "#DC9E64",
    Neutral: "#DA969B",
    Bad: "#B97ABB",
    Awful: "#804AB0",
  },
  spirited: {
    Amazing: "#57DEA8",
    Great: "#81E7BE",
    Neutral: "#ABEFD4",
    Bad: "#D5F7EA",
    Awful: "#FFFFFF",
  },
  rose: {
    Amazing: "#FF6290",
    Great: "#FF7A9B",
    Neutral: "#FF92AD",
    Bad: "#FFAABF",
    Awful: "#FFC2D1",
  },
};

export default function MoodSelector({ onSelectMood, onSchemeChange, colorScheme }) {
  const [selectedScheme, setSelectedScheme] = useState("default");

  useEffect(() => {
    const savedScheme = localStorage.getItem("selectedMoodScheme") || "default";
    setSelectedScheme(savedScheme);
  }, []);

  const handleSchemeChange = (scheme) => {
    setSelectedScheme(scheme);
    localStorage.setItem("selectedMoodScheme", scheme);
    onSchemeChange(scheme);
  };

  return (
    <div className={styles.moodSelectorContainer}>
      <div className={styles.schemeSelector}>
        <label>Choose a color scheme: </label>
        <select value={selectedScheme} onChange={(e) => handleSchemeChange(e.target.value)}>
          {Object.keys(colorSchemes).map((scheme) => (
            <option key={scheme} value={scheme}>
              {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.moodSelector}>
        {Object.keys(colorScheme)
          .filter((key) => key !== "bg" && key !== "text" && key !== "dayNumber")
          .map((mood) => (
            <button
              key={mood}
              className={styles.moodButton}
              style={{ 
                backgroundColor: colorScheme[mood], 
                color: colorScheme.dayNumber
              }}
              onClick={() => onSelectMood(mood)}
            >
              {mood}
            </button>
          ))}
      </div>
    </div>
  );
}