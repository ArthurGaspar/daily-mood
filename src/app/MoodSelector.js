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
};

export default function MoodSelector({ onSelectMood, onSchemeChange }) {
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
      {/* scheme dropdown */}
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

      {/* mood buttons */}
      <div className={styles.moodSelector}>
        {Object.keys(colorSchemes[selectedScheme]).map((mood) => (
          <button
            key={mood}
            className={styles.moodButton}
            style={{ backgroundColor: colorSchemes[selectedScheme][mood] }}
            onClick={() => onSelectMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}
